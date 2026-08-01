package com.eventmanagement.repository;

import com.eventmanagement.model.Help;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HelpRepository extends JpaRepository<Help, Long> {
    List<Help> findByStudent_UserId(Long studentId);
    List<Help> findByEvent_EventId(Long eventId);
    List<Help> findByStatus(Help.Status status);
}
