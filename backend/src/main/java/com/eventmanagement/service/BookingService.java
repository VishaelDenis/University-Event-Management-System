package com.eventmanagement.service;

import com.eventmanagement.dto.request.BookingRequest;
import com.eventmanagement.exception.BadRequestException;
import com.eventmanagement.exception.ResourceNotFoundException;
import com.eventmanagement.model.Booking;
import com.eventmanagement.model.Event;
import com.eventmanagement.model.User;
import com.eventmanagement.repository.BookingRepository;
import com.eventmanagement.repository.EventRepository;
import com.eventmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    // CREATE
    public Booking createBooking(BookingRequest request) {
        if (request.getEventId() == null) {
            throw new BadRequestException("eventId is required");
        }
        if (request.getStudentId() == null) {
            throw new BadRequestException("studentId is required");
        }
        if (request.getCount() == null || request.getCount() <= 0) {
            throw new BadRequestException("count must be greater than 0");
        }

        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Event not found with id: " + request.getEventId()));

        User student = userRepository.findById(request.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Student not found with id: " + request.getStudentId()));

        if (bookingRepository.existsByEvent_EventIdAndStudent_UserId(
                request.getEventId(), request.getStudentId())) {
            throw new BadRequestException("You have already booked this event");
        }

        Booking booking = new Booking();
        booking.setEvent(event);
        booking.setStudent(student);
        booking.setCount(request.getCount());

        return bookingRepository.save(booking);
    }

    // READ - single
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
    }

    // READ - all bookings for a student
    public List<Booking> getBookingsByStudent(Long studentId) {
        return bookingRepository.findByStudent_UserId(studentId);
    }

    // READ - all bookings for an event
    public List<Booking> getBookingsByEvent(Long eventId) {
        return bookingRepository.findByEvent_EventId(eventId);
    }

    // UPDATE - participant count only (per spec)
    public Booking updateBookingCount(Long id, BookingRequest request) {
        Booking booking = getBookingById(id);

        if (request.getCount() == null || request.getCount() <= 0) {
            throw new BadRequestException("count must be greater than 0");
        }

        booking.setCount(request.getCount());
        return bookingRepository.save(booking);
    }

    // DELETE
    public void deleteBooking(Long id) {
        Booking booking = getBookingById(id);
        bookingRepository.delete(booking);
    }
}