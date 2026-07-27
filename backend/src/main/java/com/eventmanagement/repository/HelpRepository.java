package com.eventmanagement.repository;

import com.eventmanagement.model.Help;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HelpRepository extends JpaRepository<Help, Long> {
    // TODO (Kokilaveni): custom queries
}