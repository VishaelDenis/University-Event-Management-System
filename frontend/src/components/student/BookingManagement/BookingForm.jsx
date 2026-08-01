import React, { useState, useEffect } from "react";
import { createBooking, updateBooking } from "../../../api/booking";

function BookingForm({ studentId, editingBooking, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        eventId: "",
        count: "",
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (editingBooking) {
            setFormData({
                eventId: editingBooking.event?.eventId || "",
                count: editingBooking.participantsCount || "",
            });
        } else {
            setFormData({ eventId: "", count: "" });
        }
    }, [editingBooking]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSaving(true);
        try {
            if (editingBooking) {
                await updateBooking(editingBooking.bookingId, {
                    count: Number(formData.count),
                });
            } else {
                await createBooking({
                    eventId: Number(formData.eventId),
                    studentId: studentId,
                    count: Number(formData.count),
                });
            }
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to save booking");
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-card">
            {error && <div className="form-error">{error}</div>}
            <div className="form-row">
                {!editingBooking && (
                    <div className="form-group">
                        <label>Event ID</label>
                        <input type="number" name="eventId" value={formData.eventId} onChange={handleChange} required />
                    </div>
                )}
                <div className="form-group">
                    <label>Participants Count</label>
                    <input type="number" name="count" min="1" value={formData.count} onChange={handleChange} required />
                </div>
            </div>
            <div className="form-actions">
                <button type="submit" className="btn btn-primary-sm" disabled={saving}>
                    {saving ? "Saving..." : editingBooking ? "Update Count" : "Book Event"}
                </button>
                {editingBooking && (
                    <button type="button" className="btn btn-secondary-sm" onClick={onCancel} disabled={saving}>Cancel</button>
                )}
            </div>
        </form>
    );
}

export default BookingForm;
