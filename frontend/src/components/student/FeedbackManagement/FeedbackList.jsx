import React, { useEffect, useState } from "react";
import { getFeedbackByStudent, deleteFeedback } from "../../../api/feedback";

function FeedbackList({ studentId, onEdit, refreshKey, ratingFilter }) {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchFeedbacks = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await getFeedbackByStudent(studentId);
            setFeedbacks(res.data);
        } catch (err) {
            setError("Failed to load feedback");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, [studentId, refreshKey]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this feedback?")) return;
        try {
            await deleteFeedback(id);
            setFeedbacks(feedbacks.filter((f) => f.feedbackId !== id));
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete feedback");
        }
    };

    if (loading) return <p className="loading-text">Loading feedback...</p>;
    if (error) return <p className="empty-state">{error}</p>;

    const visibleFeedbacks = ratingFilter
        ? feedbacks.filter((f) => f.rating >= Number(ratingFilter))
        : feedbacks;

    if (visibleFeedbacks.length === 0) return <p className="empty-state">No feedback found.</p>;

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Event</th>
                        <th>Rating</th>
                        <th>Feedback</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {visibleFeedbacks.map((f) => (
                        <tr key={f.feedbackId}>
                            <td>{f.feedbackId}</td>
                            <td>{f.event ? `#${f.event.eventId} - ${f.event.title || ""}` : "General"}</td>
                            <td><span className="star-rating-display">{'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}</span></td>
                            <td>{f.content}</td>
                            <td>{f.createdAt ? new Date(f.createdAt).toLocaleDateString() : "-"}</td>
                            <td>
                                <button className="btn btn-warning-sm" onClick={() => onEdit(f)}>Edit</button>{" "}
                                <button className="btn btn-danger-sm" onClick={() => handleDelete(f.feedbackId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FeedbackList;
