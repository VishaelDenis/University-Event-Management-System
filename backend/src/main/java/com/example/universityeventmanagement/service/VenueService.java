package com.example.universityeventmanagement.service;

import com.example.universityeventmanagement.model.Venue;  // ✅ THIS IMPORT IS MISSING!
import com.example.universityeventmanagement.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class VenueService {

    @Autowired
    private VenueRepository venueRepository;

    // ========== CREATE ==========
    // CREATE - Add new venue
    public Venue createVenue(Venue venue) {
        // Check if venue name already exists
        if (venueRepository.existsByName(venue.getName())) {
            throw new RuntimeException("Venue with name '" + venue.getName() + "' already exists!");
        }
        return venueRepository.save(venue);
    }

    // ========== READ ==========
    // READ - Get all venues
    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    // READ - Get venue by ID
    public Venue getVenueById(Long id) {
        return venueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venue not found with id: " + id));
    }

    // READ - Get venue by name
    public Venue getVenueByName(String name) {
        return venueRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Venue not found with name: " + name));
    }

    // READ - Get available venues only
    public List<Venue> getAvailableVenues() {
        return venueRepository.findByIsAvailableTrue();
    }

    // READ - Search venues
    public List<Venue> searchVenues(String keyword) {
        return venueRepository.findByNameContainingIgnoreCase(keyword);
    }

    // READ - Get venues with filters
    public List<Venue> getVenuesWithFilters(String name, Integer minCapacity,
                                            Integer maxCapacity, String location,
                                            Boolean isAvailable) {
        return venueRepository.findVenuesWithFilters(
                name, minCapacity, maxCapacity, location, isAvailable
        );
    }

    // READ - Find venues for event
    public List<Venue> findVenuesForEvent(Integer requiredCapacity) {
        return venueRepository.findAvailableVenuesForEvent(requiredCapacity);
    }

    // ========== UPDATE ==========
    // UPDATE - Update existing venue
    public Venue updateVenue(Long id, Venue venueDetails) {
        Venue existingVenue = getVenueById(id);

        // Check if new name conflicts with another venue
        if (!existingVenue.getName().equals(venueDetails.getName()) &&
                venueRepository.existsByName(venueDetails.getName())) {
            throw new RuntimeException("Venue with name '" + venueDetails.getName() + "' already exists!");
        }

        existingVenue.setName(venueDetails.getName());
        existingVenue.setCapacity(venueDetails.getCapacity());
        existingVenue.setLocation(venueDetails.getLocation());
        existingVenue.setDescription(venueDetails.getDescription());
        existingVenue.setIsAvailable(venueDetails.getIsAvailable());

        return venueRepository.save(existingVenue);
    }

    // UPDATE - Update capacity only
    public Venue updateCapacity(Long id, Integer newCapacity) {
        if (newCapacity == null || newCapacity < 1) {
            throw new RuntimeException("Capacity must be at least 1!");
        }
        Venue venue = getVenueById(id);
        venue.setCapacity(newCapacity);
        return venueRepository.save(venue);
    }

    // UPDATE - Toggle availability
    public Venue toggleAvailability(Long id) {
        Venue venue = getVenueById(id);
        venue.setIsAvailable(!venue.getIsAvailable());
        return venueRepository.save(venue);
    }

    // ========== DELETE ==========
    // DELETE - Delete venue
    public void deleteVenue(Long id) {
        if (!venueRepository.existsById(id)) {
            throw new RuntimeException("Venue not found with id: " + id);
        }
        venueRepository.deleteById(id);
    }
}