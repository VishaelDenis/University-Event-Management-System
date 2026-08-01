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
            throw new BadRequestException("Event id is required");
        }
        if (request.getStudentId() == null) {
            throw new BadRequestException("Student id is required");
        }

        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Event not found with id: " + request.getEventId()));

        User student = userRepository.findById(request.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Student not found with id: " + request.getStudentId()));

        Integer count = request.getCount();
        if (count == null || count <= 0) {
            throw new BadRequestException("Participant count must be greater than 0");
        }

        if (bookingRepository.existsByEvent_EventIdAndStudent_UserId(event.getEventId(), student.getUserId())) {
            throw new BadRequestException("This student has already booked this event");
        }

        int alreadyBooked = bookingRepository.sumParticipantsByEvent(event.getEventId(), Booking.Status.CANCELLED);
        if (alreadyBooked + count > event.getCapacity()) {
            int seatsLeft = event.getCapacity() - alreadyBooked;
            throw new BadRequestException(
                    "Not enough seats available. Only " + Math.max(seatsLeft, 0) + " seat(s) left");
        }

        Booking booking = new Booking();
        booking.setEvent(event);
        booking.setStudent(student);
        booking.setParticipantsCount(count);
        booking.setBookingStatus(Booking.Status.PENDING);

        return bookingRepository.save(booking);
    }

    // READ - all
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // READ - single
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
    }

    // READ - by student (student dashboard)
    public List<Booking> getBookingsByStudent(Long studentId) {
        return bookingRepository.findByStudent_UserId(studentId);
    }

    // READ - by event
    public List<Booking> getBookingsByEvent(Long eventId) {
        return bookingRepository.findByEvent_EventId(eventId);
    }

    // UPDATE - participants count only (per spec)
    public Booking updateCount(Long id, BookingRequest request) {
        Booking booking = getBookingById(id);

        Integer count = request.getCount();
        if (count == null || count <= 0) {
            throw new BadRequestException("Participant count must be greater than 0");
        }

        int alreadyBooked = bookingRepository.sumParticipantsByEventExcluding(
                booking.getEvent().getEventId(), Booking.Status.CANCELLED, booking.getBookingId());

        if (alreadyBooked + count > booking.getEvent().getCapacity()) {
            int seatsLeft = booking.getEvent().getCapacity() - alreadyBooked;
            throw new BadRequestException(
                    "Not enough seats available. Only " + Math.max(seatsLeft, 0) + " seat(s) left");
        }

        booking.setParticipantsCount(count);
        return bookingRepository.save(booking);
    }

    // DELETE
    public void deleteBooking(Long id) {
        Booking booking = getBookingById(id);
        bookingRepository.delete(booking);
    }
}
