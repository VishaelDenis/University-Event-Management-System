package com.eventmanagement.repository;

import com.eventmanagement.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByStudent_UserId(Long studentId);
    List<Feedback> findByEvent_EventId(Long eventId);
}
