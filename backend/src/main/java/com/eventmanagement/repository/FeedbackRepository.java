package com.eventmanagement.repository;

import com.eventmanagement.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    // All feedback left by a given student
    List<Feedback> findByStudent_UserIdOrderByCreatedAtDesc(Long studentId);

    // All feedback for a given event
    List<Feedback> findByEvent_EventIdOrderByCreatedAtDesc(Long eventId);

    // A specific student's feedback for a specific event
    List<Feedback> findByStudent_UserIdAndEvent_EventId(Long studentId, Long eventId);

    // Feedback filtered by minimum rating, most recent first
    List<Feedback> findByRatingGreaterThanEqualOrderByCreatedAtDesc(Integer minRating);

    // Average rating for an event
    @Query("SELECT AVG(f.rating) FROM Feedback f WHERE f.event.eventId = :eventId AND f.rating IS NOT NULL")
    Double findAverageRatingByEventId(@Param("eventId") Long eventId);

    // Count of feedback entries for an event
    long countByEvent_EventId(Long eventId);
}
