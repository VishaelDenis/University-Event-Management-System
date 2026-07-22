import React, { useState, useEffect } from 'react';
import { eventApi } from '../services/eventApi';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingEvent, setEditingEvent] = useState(null);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            setLoading(true);
            const data = await eventApi.getAll();
            setEvents(data);
            setError(null);
        } catch (err) {
            setError('Failed to load events');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await eventApi.delete(id);
                setEvents(events.filter(event => event.id !== id));
            } catch (err) {
                setError('Failed to delete event');
                console.error(err);
            }
        }
    };

    if (loading) return <div>Loading events...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div>
            <h2>Event List</h2>
            <button onClick={loadEvents}>🔄 Refresh</button>

            {events.length === 0 ? (
                <p>No events found. Create one below!</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {events.map(event => (
                        <li key={event.id} style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '15px',
                            marginBottom: '10px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <h3>{event.name}</h3>
                            <p>{event.description}</p>
                            <p>📍 {event.location}</p>
                            <p>📅 {new Date(event.dateTime).toLocaleString()}</p>
                            <p>👥 Capacity: {event.capacity}</p>
                            <div style={{ marginTop: '10px' }}>
                                <button
                                    onClick={() => setEditingEvent(event)}
                                    style={{ marginRight: '10px' }}
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(event.id)}
                                    style={{ backgroundColor: 'red', color: 'white' }}
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* Edit Form Modal */}
            {editingEvent && (
                <EditEventForm
                    event={editingEvent}
                    onUpdate={() => {
                        loadEvents();
                        setEditingEvent(null);
                    }}
                    onCancel={() => setEditingEvent(null)}
                />
            )}
        </div>
    );
};

// Edit Form Component (inside the same file)
const EditEventForm = ({ event, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({
        name: event.name,
        description: event.description,
        dateTime: event.dateTime.slice(0, 16),
        location: event.location,
        capacity: event.capacity
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            await eventApi.update(event.id, {
                ...formData,
                capacity: parseInt(formData.capacity)
            });
            onUpdate();
        } catch (err) {
            setError('Failed to update event');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                width: '400px'
            }}>
                <h3>Edit Event</h3>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Event Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    />
                    <input
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    />
                    <input
                        name="dateTime"
                        type="datetime-local"
                        value={formData.dateTime}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    />
                    <input
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    />
                    <input
                        name="capacity"
                        type="number"
                        placeholder="Capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" disabled={submitting} style={{ flex: 1 }}>
                            {submitting ? 'Updating...' : 'Update Event'}
                        </button>
                        <button type="button" onClick={onCancel} style={{ flex: 1, backgroundColor: 'gray', color: 'white' }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventList;