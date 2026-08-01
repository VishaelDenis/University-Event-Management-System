import React, { useEffect, useState } from "react";
import { getAllHelp } from "../../../api/help";

function AdminReports() {
    const [helpRequests, setHelpRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchHelpRequests = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await getAllHelp();
            setHelpRequests(res.data);
        } catch (err) {
            setError("Failed to load help requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHelpRequests();
    }, []);

    if (loading) return <p className="loading-text">Loading report data...</p>;
    if (error) return <p className="empty-state">{error}</p>;

    return (
        <div className="reports-container">
            {/* Help Requests Table */}
            {helpRequests.length === 0 ? (
                <p className="empty-state">No help requests found.</p>
            ) : (
                <div className="table-container">
                    <table>
<thead>
                            <tr>
                                <th>ID</th>
                                <th>Student</th>
                                <th>Student Email</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {helpRequests.map((h) => (
                                <tr key={h.helpId}>
                                    <td>{h.helpId}</td>
                                    <td>{h.student?.name || "N/A"}</td>
                                    <td>{h.student?.email || "N/A"}</td>
                                    <td>{h.subject}</td>
                                    <td>{h.message.length > 60 ? h.message.substring(0, 60) + "..." : h.message}</td>
                                    <td>{h.createdAt ? new Date(h.createdAt).toLocaleDateString() : "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminReports;

