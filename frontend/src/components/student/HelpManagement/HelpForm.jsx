import React, { useState } from 'react';

export default function HelpForm({ initialData, events, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        eventId: initialData?.eventId || '',
        text: initialData?.text || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.eventId || !formData.text.trim()) {
            alert('Please select an event and enter your question.');
            return;
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="help-form">
            <h4>{initialData ? 'Edit Inquiry' : 'New Inquiry'}</h4>
            <div className="form-group">
                <label>Event *</label>
                <select name="eventId" value={formData.eventId} onChange={handleChange} required>
                    <option value="">Select an event</option>
                    {events.map(ev => (
                        <option key={ev.id} value={ev.id}>{ev.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Your Question *</label>
                <textarea
                    name="text"
                    rows="4"
                    value={formData.text}
                    onChange={handleChange}
                    required
                    placeholder="Describe your issue or question..."
                />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn-primary">{initialData ? 'Update' : 'Submit'}</button>
                <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}