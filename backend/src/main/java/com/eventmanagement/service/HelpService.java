package com.eventmanagement.service;

import com.eventmanagement.dto.request.HelpRequest;
import com.eventmanagement.exception.BadRequestException;
import com.eventmanagement.exception.ResourceNotFoundException;
import com.eventmanagement.model.Event;
import com.eventmanagement.model.Help;
import com.eventmanagement.model.User;
import com.eventmanagement.repository.EventRepository;
import com.eventmanagement.repository.HelpRepository;
import com.eventmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HelpService {

    @Autowired
    private HelpRepository helpRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    public Help createHelp(HelpRequest request) {
        if (request.getStudentId() == null) {
            throw new BadRequestException("Student id is required");
        }
        if (request.getSubject() == null || request.getSubject().trim().isEmpty()) {
            throw new BadRequestException("Subject is required");
        }
        if (request.getMessage() == null || request.getMessage().trim().isEmpty()) {
            throw new BadRequestException("Message is required");
        }

        User student = userRepository.findById(request.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + request.getStudentId()));

        Help help = new Help();
        help.setStudent(student);
        help.setSubject(request.getSubject().trim());
        help.setMessage(request.getMessage().trim());

        if (request.getEventId() != null) {
            Event event = eventRepository.findById(request.getEventId())
                    .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + request.getEventId()));
            help.setEvent(event);
        }

        return helpRepository.save(help);
    }

    public List<Help> getAllHelp() {
        return helpRepository.findAll();
    }

    public Help getHelpById(Long id) {
        return helpRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Help request not found with id: " + id));
    }

    public List<Help> getHelpByStudent(Long studentId) {
        return helpRepository.findByStudent_UserId(studentId);
    }

    public List<Help> getHelpByEvent(Long eventId) {
        return helpRepository.findByEvent_EventId(eventId);
    }

    public Help updateHelp(Long id, HelpRequest request) {
        Help help = getHelpById(id);

        if (request.getSubject() != null && !request.getSubject().trim().isEmpty()) {
            help.setSubject(request.getSubject().trim());
        }
        if (request.getMessage() != null && !request.getMessage().trim().isEmpty()) {
            help.setMessage(request.getMessage().trim());
        }
        if (request.getStatus() != null) {
            try {
                help.setStatus(Help.Status.valueOf(request.getStatus().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("Invalid status. Must be one of: OPEN, IN_PROGRESS, RESOLVED, CLOSED");
            }
        }
        if (request.getEventId() != null) {
            Event event = eventRepository.findById(request.getEventId())
                    .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + request.getEventId()));
            help.setEvent(event);
        }

        return helpRepository.save(help);
    }

    public void deleteHelp(Long id) {
        Help help = getHelpById(id);
        helpRepository.delete(help);
    }
}
