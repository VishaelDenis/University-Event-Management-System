import React, { useEffect, useState } from "react";
import { getAllEvents } from "../../api/event";
import api from "../../api/axios";

function AvailableEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");

                // Fetch all events and all bookings in parallel
                const [eventsRes, bookingsRes] = await Promise.all([
                    getAllEvents(),
                    api.get("/bookings"),
                ]);

                const allEvents = eventsRes.data;
                const allBookings = bookingsRes.data;

                // Compute booked seats per event (exclude CANCELLED)
                const bookedMap = {};
                allBookings.forEach((b) => {
                    if (b.bookingStatus !== "CANCELLED" && b.event?.eventId) {
                        const eid = b.event.eventId;
                        bookedMap[eid] = (bookedMap[eid] || 0) + (b.participantsCount || 0);
                    }
                });

                // Attach available seats to each event
                const enriched = allEvents
                    .map((ev) => ({
                        ...ev,
                        booked: bookedMap[ev.eventId] || 0,
                        availableSeats: Math.max(0, ev.capacity - (bookedMap[ev.eventId] || 0)),
                    }))
                    .filter((ev) => ev.isActive !== false); // Only show active events

                setEvents(enriched);
            } catch (err) {
                setError("Failed to load available events.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p className="loading-text">Loading available events...</p>;
    if (error) return <p className="empty-state">{error}</p>;
    if (events.length === 0) return <p className="empty-state">No events are currently available.</p>;

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
        }}>
            {events.map((event) => (
                <div
                    key={event.eventId}
                    style={{
                        background: "var(--surface-light)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-md)",
                        padding: "20px",
                        transition: "border-color 0.2s ease, transform 0.2s ease",
                        cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--accent-start)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.transform = "translateY(0)";
                    }}
                >
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "12px",
                    }}>
                        <span style={{
                            fontSize: "0.75rem",
                            color: "var(--text-muted)",
                            background: "var(--base-navy)",
                            padding: "2px 10px",
                            borderRadius: "20px",
                            fontWeight: 600,
                            letterSpacing: "0.5px",
                        }}>
                            #{event.eventId}
                        </span>
                        {event.venue?.name && (
                            <span style={{
                                fontSize: "0.75rem",
                                color: "var(--text-secondary)",
                            }}>
                                {event.venue.name}
                            </span>
                        )}
                    </div>

                    <h4 style={{
                        color: "var(--text)",
                        fontSize: "1.05rem",
                        fontWeight: 600,
                        marginBottom: "8px",
                        lineHeight: 1.3,
                    }}>
                        {event.title || "Untitled Event"}
                    </h4>

                    {event.date && (
                        <p style={{
                            color: "var(--text-secondary)",
                            fontSize: "0.85rem",
                            marginBottom: "4px",
                        }}>
                            📅 {event.date}{event.time ? ` at ${event.time}` : ""}
                        </p>
                    )}

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginTop: "14px",
                        paddingTop: "14px",
                        borderTop: "1px solid var(--border)",
                    }}>
                        <div style={{
                            flex: 1,
                            height: "8px",
                            background: "var(--base-navy)",
                            borderRadius: "4px",
                            overflow: "hidden",
                        }}>
                            <div style={{
                                height: "100%",
                                width: `${Math.min(100, (event.availableSeats / event.capacity) * 100)}%`,
                                background: event.availableSeats > 0
                                    ? "linear-gradient(90deg, var(--accent-start), var(--accent-end))"
                                    : "var(--danger)",
                                borderRadius: "4px",
                                transition: "width 0.4s ease",
                            }} />
                        </div>
                        <span style={{
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: event.availableSeats > 0 ? "var(--success)" : "var(--danger)",
                            whiteSpace: "nowrap",
                        }}>
                            {event.availableSeats} / {event.capacity} seats
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AvailableEvents;

