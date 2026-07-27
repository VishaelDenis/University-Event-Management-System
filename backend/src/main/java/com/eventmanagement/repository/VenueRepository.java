package com.eventmanagement.repository;

import com.eventmanagement.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VenueRepository extends JpaRepository<Venue, Long> {
    // TODO (Nilakshy): custom queries
}