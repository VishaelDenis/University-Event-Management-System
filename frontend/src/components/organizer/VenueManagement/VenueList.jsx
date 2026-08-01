import React, { useEffect, useState } from "react";
import { getAllVenues, deleteVenue } from "../../../api/venue";

function VenueList({ onEdit, refreshKey }) {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchVenues = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await getAllVenues();
            setVenues(res.data);
        } catch (err) {
            setError("Failed to load venues");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVenues();
    }, [refreshKey]);

    const handleDelete = async (id) => {
        if (!window.confirm("Deactivate this venue?")) return;
        try {
            await deleteVenue(id);
            setVenues(venues.filter((v) => v.venueId !== id));
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete venue");
        }
    };

    if (loading) return <p className="loading-text">Loading venues...</p>;
    if (error) return <p className="empty-state">{error}</p>;
    if (venues.length === 0) return <p className="empty-state">No venues found. Create one above.</p>;

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Capacity</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {venues.map((v) => (
                        <tr key={v.venueId}>
                            <td>{v.venueId}</td>
                            <td>{v.name}</td>
                            <td>{v.capacity}</td>
                            <td>{v.location || "-"}</td>
                            <td>
                                <button className="btn btn-warning-sm" onClick={() => onEdit(v)}>Edit</button>{" "}
                                <button className="btn btn-danger-sm" onClick={() => handleDelete(v.venueId)}>Deactivate</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VenueList;
