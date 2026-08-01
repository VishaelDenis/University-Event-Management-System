import React, { useState, useEffect } from "react";
import { createHelp, updateHelp } from "../../../api/help";

function HelpForm({ studentId, editingHelp, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        eventId: "",
        subject: "",
        message: "",
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (editingHelp) {
            setFormData({
                eventId: editingHelp.event?.eventId || "",
                subject: editingHelp.subject || "",
                message: editingHelp.message || "",
            });
        } else {
            setFormData({ eventId: "", subject: "", message: "" });
        }
    }, [editingHelp]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSaving(true);
        try {
            const payload = {
                studentId,
                subject: formData.subject.trim(),
                message: formData.message.trim(),
            };
            if (formData.eventId) {
                payload.eventId = Number(formData.eventId);
            }

            if (editingHelp) {
                await updateHelp(editingHelp.helpId, payload);
            } else {
                await createHelp(payload);
            }
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to save help request");
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-card">
            {error && <div className="form-error">{error}</div>}
            <div className="form-row">
                <div className="form-group">
                    <label>Event ID (optional)</label>
                    <input type="number" name="eventId" value={formData.eventId} onChange={handleChange} placeholder="Leave blank for general help" />
                </div>
                <div className="form-group">
                    <label>Subject *</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="e.g. Unable to register for event" />
                </div>
            </div>
            <div className="form-group">
                <label>Message *</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Describe your issue in detail..."
                    rows="4"
                />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn btn-primary-sm" disabled={saving}>
                    {saving ? "Saving..." : editingHelp ? "Update Request" : "Submit Request"}
                </button>
                {editingHelp && (
                    <button type="button" className="btn btn-secondary-sm" onClick={onCancel} disabled={saving}>Cancel</button>
                )}
            </div>
        </form>
    );
}

export default HelpForm;
