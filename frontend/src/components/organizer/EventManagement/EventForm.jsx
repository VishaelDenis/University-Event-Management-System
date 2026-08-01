import React, { useState, useEffect } from "react";
import { createEvent, updateEvent } from "../../../api/event";

function EventForm({ organizerId, editingEvent, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        venueId: "",
        title: "",
        description: "",
        date: "",
        time: "",
        capacity: "",
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (editingEvent) {
            setFormData({
                venueId: editingEvent.venue?.venueId || "",
                title: editingEvent.title || "",
                description: editingEvent.description || "",
                date: editingEvent.date || "",
                time: editingEvent.time || "",
                capacity: editingEvent.capacity || "",
            });
        } else {
            setFormData({ venueId: "", title: "", description: "", date: "", time: "", capacity: "" });
        }
    }, [editingEvent]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSaving(true);
        try {
            if (editingEvent) {
                await updateEvent(editingEvent.eventId, {
                    title: formData.title,
                    description: formData.description,
                    date: formData.date,
                    time: formData.time,
                    capacity: Number(formData.capacity),
                });
            } else {
                await createEvent({
                    venueId: Number(formData.venueId),
                    organizerId: organizerId,
                    title: formData.title,
                    description: formData.description,
                    date: formData.date,
                    time: formData.time,
                    capacity: Number(formData.capacity),
                });
            }
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to save event");
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-card">
            {error && <div className="form-error">{error}</div>}
            <div className="form-row">
                {!editingEvent && (
                    <div className="form-group">
                        <label>Venue ID *</label>
                        <input type="number" name="venueId" value={formData.venueId} onChange={handleChange} required />
                    </div>
                )}
                <div className="form-group">
                    <label>Title *</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Annual Tech Symposium" />
                </div>
                <div className="form-group">
                    <label>Date *</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Time *</label>
                    <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Capacity *</label>
                    <input type="number" name="capacity" min="1" value={formData.capacity} onChange={handleChange} required />
                </div>
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe the event..." rows="3" />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn btn-primary-sm" disabled={saving}>
                    {saving ? "Saving..." : editingEvent ? "Update Event" : "Create Event"}
                </button>
                {editingEvent && (
                    <button type="button" className="btn btn-secondary-sm" onClick={onCancel} disabled={saving}>Cancel</button>
                )}
            </div>
        </form>
    );
}

export default EventForm;
