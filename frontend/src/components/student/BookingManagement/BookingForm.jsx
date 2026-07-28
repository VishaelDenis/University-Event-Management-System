import React, { useEffect, useState } from "react";
import { getAllEvents } from "../../../api/event";
import { createBooking } from "../../../api/booking";
import { isPositiveNumber } from "../../../utils/validators";
import { formatDate, formatTime } from "../../../utils/helpers";
import LoadingSpinner from "../../common/LoadingSpinner";

function eventLabel(event) {
    const title = event.title || `Event #${event.eventId}`;
    const when = event.date ? `${formatDate(event.date)}${event.time ? " " + formatTime(event.time) : ""}` : "";
    const venue = event.venue?.name ? ` @ ${event.venue.name}` : "";
    return when ? `${title} — ${when}${venue}` : `${title}${venue}`;
}

function BookingForm({ studentId, onBookingCreated }) {
    const [events, setEvents] = useState([]);
    const [eventId, setEventId] = useState("");
    const [count, setCount] = useState(1);
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setLoadingEvents(true);
        getAllEvents()
            .then((res) => {
                if (isMounted) setEvents(res.data || []);
            })
            .catch(() => {
                if (isMounted) setError("Could not load events. Please try again later.");
            })
            .finally(() => {
                if (isMounted) setLoadingEvents(false);
            });
        return () => {
            isMounted = false;
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!studentId) {
            setError("You must be logged in as a student to book an event.");
            return;
        }
        if (!eventId) {
            setError("Please select an event.");
            return;
        }
        if (!isPositiveNumber(count)) {
            setError("Number of participants must be a positive number.");
            return;
        }

        setSubmitting(true);
        try {
            const res = await createBooking({
                eventId: Number(eventId),
                studentId: Number(studentId),
                count: Number(count),
            });
            setSuccess("Booking created successfully!");
            setEventId("");
            setCount(1);
            if (onBookingCreated) onBookingCreated(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create booking.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingEvents) return <LoadingSpinner />;

    return (
        <form onSubmit={handleSubmit} className="booking-form">
            <h3>Book an Event</h3>

            {error && <p className="form-error">{error}</p>}
            {success && <p className="form-success">{success}</p>}

            <div className="form-group">
                <label htmlFor="event-select">Event</label>
                <select
                    id="event-select"
                    value={eventId}
                    onChange={(e) => setEventId(e.target.value)}
                >
                    <option value="">-- Select an event --</option>
                    {events.map((event) => (
                        <option key={event.eventId} value={event.eventId}>
                            {eventLabel(event)}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="count-input">Number of Participants</label>
                <input
                    id="count-input"
                    type="number"
                    min="1"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                />
            </div>

            <button type="submit" disabled={submitting}>
                {submitting ? "Booking..." : "Book Now"}
            </button>
        </form>
    );
}

export default BookingForm;
