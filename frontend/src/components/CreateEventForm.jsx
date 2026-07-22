import React, { useState } from 'react';
import { eventApi } from '../services/eventApi';

const CreateEventForm = ({ onEventCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        dateTime: '',
        location: '',
        capacity: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage('');
        setError('');

        try {
            await eventApi.create({
                ...formData,
                capacity: parseInt(formData.capacity)
            });
            setMessage('Event created successfully!');
            setFormData({ name: '', description: '', dateTime: '', location: '', capacity: '' });
            if (onEventCreated) onEventCreated();
        } catch (err) {
            setError('Failed to create event');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px',
            backgroundColor: '#f0f8ff'
        }}>
            <h3>➕ Create New Event</h3>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Event Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    name="description"
                    placeholder="Description *"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    name="dateTime"
                    type="datetime-local"
                    value={formData.dateTime}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    name="location"
                    placeholder="Location *"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    name="capacity"
                    type="number"
                    placeholder="Capacity *"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {submitting ? 'Creating...' : 'Create Event'}
                </button>
            </form>
            {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
    );
};

export default CreateEventForm;