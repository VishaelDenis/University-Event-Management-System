package com.eventmanagement.repository;

import com.eventmanagement.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // All bookings made by a given student (for the student dashboard)
    List<Booking> findByStudent_UserId(Long studentId);

    // All bookings for a given event (useful for organizers / capacity checks)
    List<Booking> findByEvent_EventId(Long eventId);

    // Enforce one booking per student per event (mirrors the DB unique_booking constraint)
    boolean existsByEvent_EventIdAndStudent_UserId(Long eventId, Long studentId);

    // Total participants currently booked for an event, excluding a given status (e.g. CANCELLED)
    @Query("SELECT COALESCE(SUM(b.participantsCount), 0) FROM Booking b " +
            "WHERE b.event.eventId = :eventId AND b.bookingStatus <> :excludedStatus")
    Integer sumParticipantsByEvent(@Param("eventId") Long eventId,
                                    @Param("excludedStatus") Booking.Status excludedStatus);

    // Same as above, but also excludes one specific booking (used when updating that booking's count)
    @Query("SELECT COALESCE(SUM(b.participantsCount), 0) FROM Booking b " +
            "WHERE b.event.eventId = :eventId AND b.bookingStatus <> :excludedStatus " +
            "AND b.bookingId <> :excludeBookingId")
    Integer sumParticipantsByEventExcluding(@Param("eventId") Long eventId,
                                             @Param("excludedStatus") Booking.Status excludedStatus,
                                             @Param("excludeBookingId") Long excludeBookingId);
}
