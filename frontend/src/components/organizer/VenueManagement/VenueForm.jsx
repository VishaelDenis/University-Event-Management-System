import React, { useState, useEffect } from "react";
import { createVenue, updateVenue } from "../../../api/venue";

function VenueForm({ editingVenue, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        name: "",
        capacity: "",
        location: "",
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (editingVenue) {
            setFormData({
                name: editingVenue.name || "",
                capacity: editingVenue.capacity || "",
                location: editingVenue.location || "",
            });
        } else {
            setFormData({ name: "", capacity: "", location: "" });
        }
    }, [editingVenue]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSaving(true);
        try {
            const payload = {
                name: formData.name.trim(),
                capacity: Number(formData.capacity),
                location: formData.location.trim() || null,
            };
            if (editingVenue) {
                await updateVenue(editingVenue.venueId, payload);
            } else {
                await createVenue(payload);
            }
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to save venue");
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-card">
            {error && <div className="form-error">{error}</div>}
            <div className="form-row">
                <div className="form-group">
                    <label>Venue Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Main Auditorium" />
                </div>
                <div className="form-group">
                    <label>Capacity *</label>
                    <input type="number" name="capacity" min="1" value={formData.capacity} onChange={handleChange} required placeholder="e.g. 200" />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Building A, Floor 2" />
                </div>
            </div>
            <div className="form-actions">
                <button type="submit" className="btn btn-primary-sm" disabled={saving}>
                    {saving ? "Saving..." : editingVenue ? "Update Venue" : "Create Venue"}
                </button>
                {editingVenue && (
                    <button type="button" className="btn btn-secondary-sm" onClick={onCancel} disabled={saving}>Cancel</button>
                )}
            </div>
        </form>
    );
}

export default VenueForm;
