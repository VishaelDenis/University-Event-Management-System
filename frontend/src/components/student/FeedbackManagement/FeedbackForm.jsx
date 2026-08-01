import React, { useState, useEffect } from "react";
import { createFeedback, updateFeedback } from "../../../api/feedback";

function FeedbackForm({ studentId, editingFeedback, onSuccess, onCancel }) {
    const [formData, setFormData] = useState({
        eventId: "",
        rating: 5,
        content: "",
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (editingFeedback) {
            setFormData({
                eventId: editingFeedback.event?.eventId || "",
                rating: editingFeedback.rating || 5,
                content: editingFeedback.content || "",
            });
        } else {
            setFormData({ eventId: "", rating: 5, content: "" });
        }
    }, [editingFeedback]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "rating" ? Number(value) : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSaving(true);
        try {
            const payload = {
                studentId,
                rating: formData.rating,
                content: formData.content.trim(),
            };
            if (formData.eventId) {
                payload.eventId = Number(formData.eventId);
            }

            if (editingFeedback) {
                await updateFeedback(editingFeedback.feedbackId, payload);
            } else {
                await createFeedback(payload);
            }
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to save feedback");
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
                    <input type="number" name="eventId" value={formData.eventId} onChange={handleChange} placeholder="Leave blank for general feedback" />
                </div>
                <div className="form-group">
                    <label>Rating *</label>
                    <div className="star-rating" style={{ marginTop: "6px" }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className={"star-btn" + (formData.rating >= star ? " active" : "")}
                                onClick={() => setFormData({ ...formData, rating: star })}
                            >
                                ★
                            </button>
                        ))}
                        <span className="rating-label">{formData.rating}/5</span>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>Feedback Content *</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    placeholder="Share your thoughts about the event..."
                    rows="4"
                />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn btn-primary-sm" disabled={saving}>
                    {saving ? "Saving..." : editingFeedback ? "Update Feedback" : "Submit Feedback"}
                </button>
                {editingFeedback && (
                    <button type="button" className="btn btn-secondary-sm" onClick={onCancel} disabled={saving}>Cancel</button>
                )}
            </div>
        </form>
    );
}

export default FeedbackForm;
