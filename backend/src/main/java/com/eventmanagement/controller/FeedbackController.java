package com.eventmanagement.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

    // TODO (Daniel): POST, PUT (text), DELETE

    @GetMapping("/ping")
    public String ping() {
        return "Feedback module - not implemented yet";
    }
}