package com.eventmanagement.service;

import com.eventmanagement.dto.request.VenueRequest;
import com.eventmanagement.exception.BadRequestException;
import com.eventmanagement.exception.ResourceNotFoundException;
import com.eventmanagement.model.Venue;
import com.eventmanagement.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VenueService {

    @Autowired
    private VenueRepository venueRepository;

    public Venue createVenue(VenueRequest request) {
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new BadRequestException("Venue name is required");
        }
        if (request.getCapacity() == null || request.getCapacity() <= 0) {
            throw new BadRequestException("Capacity must be greater than 0");
        }

        Venue venue = new Venue();
        venue.setName(request.getName().trim());
        venue.setCapacity(request.getCapacity());
        venue.setLocation(request.getLocation());
        return venueRepository.save(venue);
    }

    public List<Venue> getAllVenues() {
        return venueRepository.findByIsActiveTrue();
    }

    public List<Venue> getAllVenuesIncludingInactive() {
        return venueRepository.findAll();
    }

    public Venue getVenueById(Long id) {
        return venueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Venue not found with id: " + id));
    }

    public Venue updateVenue(Long id, VenueRequest request) {
        Venue venue = getVenueById(id);

        if (request.getName() != null && !request.getName().trim().isEmpty()) {
            venue.setName(request.getName().trim());
        }
        if (request.getCapacity() != null) {
            if (request.getCapacity() <= 0) {
                throw new BadRequestException("Capacity must be greater than 0");
            }
            venue.setCapacity(request.getCapacity());
        }
        if (request.getLocation() != null) {
            venue.setLocation(request.getLocation());
        }

        return venueRepository.save(venue);
    }

    public void deleteVenue(Long id) {
        Venue venue = getVenueById(id);
        venue.setIsActive(false);
        venueRepository.save(venue);
    }

    public void hardDeleteVenue(Long id) {
        Venue venue = getVenueById(id);
        venueRepository.delete(venue);
    }
}
