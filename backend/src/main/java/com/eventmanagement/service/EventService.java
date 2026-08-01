package com.eventmanagement.service;

import com.eventmanagement.dto.request.EventRequest;
import com.eventmanagement.exception.ResourceNotFoundException;
import com.eventmanagement.model.Event;
import com.eventmanagement.model.User;
import com.eventmanagement.model.Venue;
import com.eventmanagement.repository.EventRepository;
import com.eventmanagement.repository.UserRepository;
import com.eventmanagement.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private UserRepository userRepository;

    // CREATE
    public Event createEvent(EventRequest request) {
        Venue venue = venueRepository.findById(request.getVenueId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Venue not found with id: " + request.getVenueId()));

        User organizer = userRepository.findById(request.getOrganizerId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Organizer not found with id: " + request.getOrganizerId()));

        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Title is required");
        }
        if (request.getCapacity() == null || request.getCapacity() <= 0) {
            throw new IllegalArgumentException("Capacity must be greater than 0");
        }
        if (request.getCapacity() > venue.getCapacity()) {
            throw new IllegalArgumentException(
                    "Event capacity cannot exceed venue capacity (" + venue.getCapacity() + ")");
        }

        Event event = new Event();
        event.setVenue(venue);
        event.setOrganizer(organizer);
        event.setTitle(request.getTitle().trim());
        event.setDescription(request.getDescription());
        event.setDate(request.getDate());
        event.setTime(request.getTime());
        event.setCapacity(request.getCapacity());

        return eventRepository.save(event);
    }

    // READ - all
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // READ - single
    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + id));
    }

    // READ - by organizer
    public List<Event> getEventsByOrganizer(Long organizerId) {
        return eventRepository.findByOrganizer_UserId(organizerId);
    }

    // UPDATE - date, time, capacity, title, description
    public Event updateEvent(Long id, EventRequest request) {
        Event event = getEventById(id);

        if (request.getTitle() != null && !request.getTitle().trim().isEmpty()) {
            event.setTitle(request.getTitle().trim());
        }
        if (request.getDescription() != null) {
            event.setDescription(request.getDescription());
        }
        if (request.getCapacity() != null) {
            if (request.getCapacity() <= 0) {
                throw new IllegalArgumentException("Capacity must be greater than 0");
            }
            if (request.getCapacity() > event.getVenue().getCapacity()) {
                throw new IllegalArgumentException(
                        "Event capacity cannot exceed venue capacity (" + event.getVenue().getCapacity() + ")");
            }
            event.setCapacity(request.getCapacity());
        }

        if (request.getDate() != null) {
            event.setDate(request.getDate());
        }

        if (request.getTime() != null) {
            event.setTime(request.getTime());
        }

        return eventRepository.save(event);
    }

    // DELETE
    public void deleteEvent(Long id) {
        Event event = getEventById(id);
        eventRepository.delete(event);
    }
}