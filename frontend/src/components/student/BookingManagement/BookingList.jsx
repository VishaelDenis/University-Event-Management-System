import React, { useState } from "react";
import { formatDate, formatTime } from "../../../utils/helpers";
import { isPositiveNumber } from "../../../utils/validators";
import LoadingSpinner from "../../common/LoadingSpinner";

function eventLabel(event) {
    if (!event) return "Unknown event";
    const title = event.title || `Event #${event.eventId}`;
    const when = event.date ? `${formatDate(event.date)}${event.time ? " " + formatTime(event.time) : ""}` : "";
    return when ? `${title} — ${when}` : title;
}

function BookingRow({ booking, onUpdate, onDelete }) {
    const [editing, setEditing] = useState(false);
    const [count, setCount] = useState(booking.count);
    const [saving, setSaving] = useState(false);
    const [rowError, setRowError] = useState(null);

    const handleSave = async () => {
        setRowError(null);
        if (!isPositiveNumber(count)) {
            setRowError("Count must be a positive number.");
            return;
        }
        setSaving(true);
        try {
            await onUpdate(booking.bookingId, Number(count));
            setEditing(false);
        } catch (err) {
            setRowError(err.response?.data?.message || "Failed to update booking.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Cancel this booking?")) return;
        setSaving(true);
        try {
            await onDelete(booking.bookingId);
        } catch (err) {
            setRowError(err.response?.data?.message || "Failed to cancel booking.");
            setSaving(false);
        }
    };

    return (
        <tr>
            <td>{eventLabel(booking.event)}</td>
            <td>
                {editing ? (
                    <input
                        type="number"
                        min="1"
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                        style={{ width: "70px" }}
                    />
                ) : (
                    booking.count
                )}
            </td>
            <td>{booking.createdAt ? formatDate(booking.createdAt) : "-"}</td>
            <td>
                {editing ? (
                    <>
                        <button onClick={handleSave} disabled={saving}>Save</button>{" "}
                        <button onClick={() => { setEditing(false); setCount(booking.count); }} disabled={saving}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setEditing(true)} disabled={saving}>Update</button>{" "}
                        <button onClick={handleDelete} disabled={saving}>Delete</button>
                    </>
                )}
                {rowError && <p className="form-error">{rowError}</p>}
            </td>
        </tr>
    );
}

function BookingList({ bookings, loading, error, onUpdate, onDelete }) {
    if (loading) return <LoadingSpinner />;
    if (error) return <p className="form-error">{error}</p>;
    if (!bookings || bookings.length === 0) return <p>You have no bookings yet.</p>;

    return (
        <table>
            <thead>
                <tr>
                    <th>Event</th>
                    <th>Participants</th>
                    <th>Booked On</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((booking) => (
                    <BookingRow
                        key={booking.bookingId}
                        booking={booking}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default BookingList;
