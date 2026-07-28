package com.eventmanagement.repository;

/**
 * DUMMY / STAND-IN — Venue Management owner's file in the real repo.
 * Skip copying this in if it already exists there.
 */

import com.eventmanagement.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VenueRepository extends JpaRepository<Venue, Long> {
}
