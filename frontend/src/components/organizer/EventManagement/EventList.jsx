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

    if (loading) return <p>Loading events...</p>;
    if (error) return <p>{error}</p>;

    return (
        <table border="1" cellPadding="8">
            <thead>
            <tr>
                <th>Event ID</th>
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
                    <td>{event.venue?.name}</td>
                    <td>{event.date}</td>
                    <td>{event.time}</td>
                    <td>{event.capacity}</td>
                    <td>
                        <button onClick={() => onEdit(event)}>Edit</button>
                        <button onClick={() => handleDelete(event.eventId)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default EventList;