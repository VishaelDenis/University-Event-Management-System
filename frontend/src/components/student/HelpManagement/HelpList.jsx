import React, { useState, useEffect } from 'react';
import { helpApi } from '../../../api/help';
import { eventApi } from '../../../api/event'; // from Vishael
import HelpFilters from './HelpFilters';
import HelpForm from './HelpForm';
import { useNavigate } from 'react-router-dom';

export default function HelpList() {
    const [requests, setRequests] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingRequest, setEditingRequest] = useState(null);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    // Fetch help requests and events list
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [helpRes, eventsRes] = await Promise.all([
                    helpApi.getMyHelpRequests(),
                    eventApi.getEvents() // Get all events for dropdown in filters/form
                ]);
                setRequests(helpRes.data);
                setFiltered(helpRes.data);
                setEvents(eventsRes.data);
            } catch (err) {
                console.error('Error loading data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this inquiry?')) {
            try {
                await helpApi.deleteHelp(id);
                const updated = requests.filter(req => req.id !== id);
                setRequests(updated);
                setFiltered(updated);
            } catch (err) {
                alert('Failed to delete. You may not own this request.');
            }
        }
    };

    const handleEdit = (request) => {
        setEditingRequest(request);
        setShowForm(true);
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingRequest) {
                // Update
                const res = await helpApi.updateHelp(editingRequest.id, { text: formData.text });
                const updated = requests.map(req => req.id === editingRequest.id ? res.data : req);
                setRequests(updated);
                setFiltered(updated);
            } else {
                // Create
                const res = await helpApi.createHelp(formData);
                setRequests([res.data, ...requests]);
                setFiltered([res.data, ...filtered]);
            }
            setShowForm(false);
            setEditingRequest(null);
        } catch (err) {
            alert('Failed to save inquiry. Please try again.');
        }
    };

    const handleFilter = (filters) => {
        // filters: { status, eventId, search }
        let result = [...requests];
        if (filters.status) {
            result = result.filter(r => r.status === filters.status);
        }
        if (filters.eventId) {
            result = result.filter(r => r.eventId === parseInt(filters.eventId));
        }
        if (filters.search) {
            const s = filters.search.toLowerCase();
            result = result.filter(r => r.text.toLowerCase().includes(s));
        }
        setFiltered(result);
    };

    if (loading) return <div className="loading-spinner">Loading your inquiries...</div>;

    return (
        <div className="help-management">
            <div className="help-header">
                <h3>My Help Requests</h3>
                <button className="btn-primary" onClick={() => { setEditingRequest(null); setShowForm(true); }}>
                    + New Inquiry
                </button>
            </div>

            {/* Filters */}
            <HelpFilters events={events} onFilter={handleFilter} />

            {/* Form Modal (Create/Edit) */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <HelpForm
                            initialData={editingRequest ? { eventId: editingRequest.eventId, text: editingRequest.text } : null}
                            events={events}
                            onSubmit={handleFormSubmit}
                            onCancel={() => { setShowForm(false); setEditingRequest(null); }}
                        />
                    </div>
                </div>
            )}

            {/* List of requests */}
            {filtered.length === 0 ? (
                <p className="empty-state">No inquiries match your criteria.</p>
            ) : (
                <ul className="help-list">
                    {filtered.map(req => (
                        <li key={req.id} className="help-item">
                            <div className="help-content">
                                <div className="help-meta">
                  <span className={`status-badge ${req.status?.toLowerCase() || 'pending'}`}>
                    {req.status || 'PENDING'}
                  </span>
                                    <span className="event-name">
                    Event: {events.find(e => e.id === req.eventId)?.name || req.eventId}
                  </span>
                                    <span className="help-date">
                    {new Date(req.createdAt).toLocaleString()}
                  </span>
                                </div>
                                <p className="help-text">{req.text}</p>
                            </div>
                            <div className="help-actions">
                                <button className="btn-edit" onClick={() => handleEdit(req)}>Edit</button>
                                <button className="btn-delete" onClick={() => handleDelete(req.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}