package com.example.universityeventmanagement.controller;

import com.example.universityeventmanagement.model.Venue;
import com.example.universityeventmanagement.service.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/venues")
@CrossOrigin(origins = "http://localhost:3000")
public class VenueController {

    @Autowired
    private VenueService venueService;

    // CREATE - POST /api/venues
    @PostMapping
    public ResponseEntity<?> createVenue(@Valid @RequestBody Venue venue) {
        try {
            Venue created = venueService.createVenue(venue);
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // READ ALL - GET /api/venues
    @GetMapping
    public ResponseEntity<List<Venue>> getAllVenues() {
        List<Venue> venues = venueService.getAllVenues();
        return ResponseEntity.ok(venues);
    }

    // READ ONE - GET /api/venues/{id}
    @GetMapping("/{id}")
    public ResponseEntity<?> getVenueById(@PathVariable Long id) {
        try {
            Venue venue = venueService.getVenueById(id);
            return ResponseEntity.ok(venue);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // UPDATE - PUT /api/venues/{id}
    @PutMapping("/{id}")
    public ResponseEntity<?> updateVenue(@PathVariable Long id,
                                         @Valid @RequestBody Venue venueDetails) {
        try {
            Venue updated = venueService.updateVenue(id, venueDetails);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("not found")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // UPDATE CAPACITY - PUT /api/venues/{id}/capacity
    @PutMapping("/{id}/capacity")
    public ResponseEntity<?> updateCapacity(@PathVariable Long id,
                                            @RequestBody Integer capacity) {
        try {
            Venue updated = venueService.updateCapacity(id, capacity);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("not found")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // TOGGLE AVAILABILITY - PUT /api/venues/{id}/toggle
    @PutMapping("/{id}/toggle")
    public ResponseEntity<?> toggleAvailability(@PathVariable Long id) {
        try {
            Venue updated = venueService.toggleAvailability(id);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE - DELETE /api/venues/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVenue(@PathVariable Long id) {
        try {
            venueService.deleteVenue(id);
            return ResponseEntity.ok("Venue deleted successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // SEARCH - GET /api/venues/search?keyword=hall
    @GetMapping("/search")
    public ResponseEntity<List<Venue>> searchVenues(@RequestParam String keyword) {
        List<Venue> venues = venueService.searchVenues(keyword);
        return ResponseEntity.ok(venues);
    }

    // FILTER - GET /api/venues/filter?name=hall&minCapacity=50&isAvailable=true
    @GetMapping("/filter")
    public ResponseEntity<List<Venue>> filterVenues(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Integer minCapacity,
            @RequestParam(required = false) Integer maxCapacity,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Boolean isAvailable) {

        List<Venue> venues = venueService.getVenuesWithFilters(
                name, minCapacity, maxCapacity, location, isAvailable
        );
        return ResponseEntity.ok(venues);
    }

    // GET AVAILABLE VENUES - GET /api/venues/available
    @GetMapping("/available")
    public ResponseEntity<List<Venue>> getAvailableVenues() {
        List<Venue> venues = venueService.getAvailableVenues();
        return ResponseEntity.ok(venues);
    }

    @GetMapping("/for-event")
    public ResponseEntity<List<Venue>> getVenuesForEvent(
            @RequestParam Integer capacity) {
        List<Venue> venues = venueService.findVenuesForEvent(capacity);
        return ResponseEntity.ok(venues);
    }
}