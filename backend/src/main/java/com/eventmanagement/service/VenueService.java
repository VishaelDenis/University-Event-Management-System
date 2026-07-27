package com.eventmanagement.service;

import com.eventmanagement.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VenueService {

    @Autowired
    private VenueRepository venueRepository;

    // TODO (Nilakshy): createVenue, updateCapacity, deleteVenue
}