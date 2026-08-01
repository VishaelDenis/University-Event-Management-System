import React, { useEffect, useState } from "react";
import { getEventsByOrganizer, deleteEvent } from "../../../api/event";

function EventList({ organizerId, onEdit }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const res = await getEventsByOrganizer(organizerId);
            setEvents(res.data);
        } catch (err) {
            setError("Failed to load events");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [organizerId]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this event?")) return;
        try {
            await deleteEvent(id);
            setEvents(events.filter((e) => e.eventId !== id));
        } catch (err) {
            alert("Failed to delete event");
        }
    };

    if (loading) return <p className="loading-text">Loading events...</p>;
    if (error) return <p className="empty-state">{error}</p>;
    if (events.length === 0) return <p className="empty-state">No events found. Create one above.</p>;

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Event ID</th>
                        <th>Title</th>
                        <th>Venue</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Capacity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.eventId}>
                            <td>{event.eventId}</td>
                            <td><strong>{event.title || "-"}</strong></td>
                            <td>{event.venue?.name || "-"}</td>
                            <td>{event.date}</td>
                            <td>{event.time}</td>
                            <td>{event.capacity}</td>
                            <td>
                                <button className="btn btn-warning-sm" onClick={() => onEdit(event)}>Edit</button>{" "}
                                <button className="btn btn-danger-sm" onClick={() => handleDelete(event.eventId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EventList;
