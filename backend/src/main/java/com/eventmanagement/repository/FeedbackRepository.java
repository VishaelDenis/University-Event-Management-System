package com.eventmanagement.repository;

import com.eventmanagement.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    // TODO (Daniel): custom queries
}