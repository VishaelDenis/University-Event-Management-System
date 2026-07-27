package com.eventmanagement.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    // TODO (Vithusan): POST, PUT (count), DELETE

    @GetMapping("/ping")
    public String ping() {
        return "Booking module - not implemented yet";
    }
}