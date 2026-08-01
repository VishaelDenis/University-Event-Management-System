import React, { useEffect, useState } from "react";
import { getHelpByStudent, deleteHelp } from "../../../api/help";

function HelpList({ studentId, onEdit, statusFilter, refreshKey }) {
    const [helps, setHelps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchHelps = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await getHelpByStudent(studentId);
            setHelps(res.data);
        } catch (err) {
            setError("Failed to load help requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHelps();
    }, [studentId, refreshKey]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this help request?")) return;
        try {
            await deleteHelp(id);
            setHelps(helps.filter((h) => h.helpId !== id));
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete help request");
        }
    };

    if (loading) return <p className="loading-text">Loading help requests...</p>;
    if (error) return <p className="empty-state">{error}</p>;

    const visibleHelps = statusFilter
        ? helps.filter((h) => h.status === statusFilter)
        : helps;

    if (visibleHelps.length === 0) return <p className="empty-state">No help requests found.</p>;

    return (
        <div className="table-container">
            <table>
<thead>
                    <tr>
                        <th>ID</th>
                        <th>Subject</th>
                        <th>Event</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {visibleHelps.map((h) => (
                        <tr key={h.helpId}>
                            <td>{h.helpId}</td>
                            <td>{h.subject}</td>
                            <td>{h.event ? `#${h.event.eventId}` : "General"}</td>
                            <td>{h.message.length > 50 ? h.message.substring(0, 50) + "..." : h.message}</td>
                            <td>{h.createdAt ? new Date(h.createdAt).toLocaleDateString() : "-"}</td>
                            <td>
                                <button className="btn btn-warning-sm" onClick={() => onEdit(h)}>Edit</button>{" "}
                                <button className="btn btn-danger-sm" onClick={() => handleDelete(h.helpId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HelpList;
