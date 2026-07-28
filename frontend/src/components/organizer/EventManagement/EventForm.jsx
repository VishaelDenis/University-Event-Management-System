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
        }
    }, [editingEvent]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingEvent) {
                // Update only allows date, time, capacity (per spec)
                await updateEvent(editingEvent.eventId, {
                    date: formData.date,
                    time: formData.time,
                    capacity: Number(formData.capacity),
                });
            } else {
                await createEvent({
                    venueId: Number(formData.venueId),
                    organizerId: organizerId,
                    date: formData.date,
                    time: formData.time,
                    capacity: Number(formData.capacity),
                });
            }
            onSuccess();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to save event");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {!editingEvent && (
                <div>
                    <label>Venue ID</label>
                    <input type="number" name="venueId" value={formData.venueId} onChange={handleChange} required />
                </div>
            )}

            <div>
                <label>Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div>
                <label>Time</label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />
            </div>

            <div>
                <label>Capacity</label>
                <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required />
            </div>

            <button type="submit">{editingEvent ? "Update" : "Create"} Event</button>
            {editingEvent && <button type="button" onClick={onCancel}>Cancel</button>}
        </form>
    );
}

export default EventForm;