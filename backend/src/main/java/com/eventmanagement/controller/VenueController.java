package com.eventmanagement.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/venues")
@CrossOrigin(origins = "http://localhost:3000")
public class VenueController {

    // TODO (Nilakshy): POST, PUT (capacity), DELETE

    @GetMapping("/ping")
    public String ping() {
        return "Venue module - not implemented yet";
    }
}