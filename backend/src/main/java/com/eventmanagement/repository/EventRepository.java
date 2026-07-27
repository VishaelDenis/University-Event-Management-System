package com.eventmanagement.repository;

import com.eventmanagement.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByOrganizer_UserId(Long organizerId);
    List<Event> findByVenue_VenueId(Long venueId);
}