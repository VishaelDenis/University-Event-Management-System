import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { getBookingsByStudent, updateBooking, deleteBooking } from "../../../api/booking";
import BookingForm from "./BookingForm";
import BookingFilters from "./BookingFilters";
import BookingList from "./BookingList";

function BookingManagement() {
    const { user } = useAuth();
    // Fallback while login/JWT wiring is still in progress: allow a manual
    // student id for local testing, same idea as other WIP dashboard modules.
    const [manualStudentId, setManualStudentId] = useState(
        localStorage.getItem("studentId") || ""
    );
    const studentId = user?.userId || (manualStudentId ? Number(manualStudentId) : null);

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");

    const loadBookings = useCallback(() => {
        if (!studentId) return;
        setLoading(true);
        setError(null);
        getBookingsByStudent(studentId)
            .then((res) => setBookings(res.data || []))
            .catch(() => setError("Could not load your bookings. Please try again later."))
            .finally(() => setLoading(false));
    }, [studentId]);

    useEffect(() => {
        loadBookings();
    }, [loadBookings]);

    const handleUpdate = async (bookingId, count) => {
        await updateBooking(bookingId, { count });
        loadBookings();
    };

    const handleDelete = async (bookingId) => {
        await deleteBooking(bookingId);
        loadBookings();
    };

    const filteredBookings = useMemo(() => {
        if (!query) return bookings;
        const q = query.toLowerCase();
        return bookings.filter((b) => {
            const title = b.event?.title || `event #${b.event?.eventId}`;
            return title.toLowerCase().includes(q);
        });
    }, [bookings, query]);

    return (
        <section className="booking-management">
            <h2>My Bookings</h2>

            {!studentId && (
                <div className="form-error">
                    <p>No logged-in student found. Enter a student ID to test this module:</p>
                    <input
                        type="number"
                        placeholder="Student ID"
                        value={manualStudentId}
                        onChange={(e) => {
                            setManualStudentId(e.target.value);
                            localStorage.setItem("studentId", e.target.value);
                        }}
                    />
                </div>
            )}

            <BookingForm studentId={studentId} onBookingCreated={loadBookings} />

            <BookingFilters onSearch={setQuery} />

            <BookingList
                bookings={filteredBookings}
                loading={loading}
                error={error}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </section>
    );
}

export default BookingManagement;
