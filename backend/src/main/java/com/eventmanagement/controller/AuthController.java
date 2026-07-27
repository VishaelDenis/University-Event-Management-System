package com.eventmanagement.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    // TODO (Karikalan): POST /login, POST /register

    @GetMapping("/ping")
    public String ping() {
        return "Auth module - not implemented yet";
    }
}