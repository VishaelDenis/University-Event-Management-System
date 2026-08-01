package com.eventmanagement.controller;

import com.eventmanagement.dto.request.HelpRequest;
import com.eventmanagement.model.Help;
import com.eventmanagement.service.HelpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/help")
@CrossOrigin(origins = "http://localhost:3000")
public class HelpController {

    @Autowired
    private HelpService helpService;

    @PostMapping
    public ResponseEntity<Help> createHelp(@RequestBody HelpRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(helpService.createHelp(request));
    }

    @GetMapping
    public ResponseEntity<List<Help>> getAllHelp() {
        return ResponseEntity.ok(helpService.getAllHelp());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Help> getHelpById(@PathVariable Long id) {
        return ResponseEntity.ok(helpService.getHelpById(id));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Help>> getHelpByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(helpService.getHelpByStudent(studentId));
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Help>> getHelpByEvent(@PathVariable Long eventId) {
        return ResponseEntity.ok(helpService.getHelpByEvent(eventId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Help> updateHelp(@PathVariable Long id, @RequestBody HelpRequest request) {
        return ResponseEntity.ok(helpService.updateHelp(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHelp(@PathVariable Long id) {
        helpService.deleteHelp(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/ping")
    public String ping() {
        return "Help module - implemented";
    }
}
