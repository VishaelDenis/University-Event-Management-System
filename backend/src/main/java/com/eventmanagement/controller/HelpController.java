package com.eventmanagement.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/help")
@CrossOrigin(origins = "http://localhost:3000")
public class HelpController {

    // TODO (Kokilaveni): POST, PUT (text), DELETE

    @GetMapping("/ping")
    public String ping() {
        return "Help module - not implemented yet";
    }
}