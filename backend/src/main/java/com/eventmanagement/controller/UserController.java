package com.eventmanagement.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    // TODO (Karikalan):
    // PUT /api/users/{id}/role - update role to organizer (admin)
    // DELETE /api/users/{id} - delete user

    @GetMapping("/ping")
    public String ping() {
        return "User module - not implemented yet";
    }
}