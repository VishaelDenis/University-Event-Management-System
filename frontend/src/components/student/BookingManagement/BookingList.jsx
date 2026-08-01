import React, { useEffect, useState, useCallback } from "react";
import { getBookingsByStudent, deleteBooking } from "../../../api/booking";

function BookingList({ studentId, onEdit, statusFilter, refreshKey }) {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBookings = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            const res = await getBookingsByStudent(studentId);
            setBookings(res.data);
        } catch (err) {
            setError("Failed to load bookings");
        } finally {
            setLoading(false);
        }
    }, [studentId]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings, refreshKey]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this booking?")) return;
        try {
            await deleteBooking(id);
            setBookings(bookings.filter((b) => b.bookingId !== id));
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete booking");
        }
    };

    if (loading) return <p className="loading-text">Loading bookings...</p>;
    if (error) return <p className="empty-state">{error}</p>;

    const visibleBookings = statusFilter
        ? bookings.filter((b) => b.bookingStatus === statusFilter)
        : bookings;

    if (visibleBookings.length === 0) return <p className="empty-state">No bookings found.</p>;

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Event</th>
                        <th>Participants</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {visibleBookings.map((booking) => (
                        <tr key={booking.bookingId}>
                            <td>{booking.bookingId}</td>
                            <td>
                                Event #{booking.event?.eventId}
                                {booking.event?.venue?.name ? ` - ${booking.event.venue.name}` : ""}
                                {booking.event?.date
                                    ? ` (${booking.event.date} ${booking.event.time || ""})`
                                    : ""}
                            </td>
<td>{booking.participantsCount}</td>
                            <td>
                                <button className="btn btn-warning-sm" onClick={() => onEdit(booking)}>Update Count</button>{" "}
                                <button className="btn btn-danger-sm" onClick={() => handleDelete(booking.bookingId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookingList;
