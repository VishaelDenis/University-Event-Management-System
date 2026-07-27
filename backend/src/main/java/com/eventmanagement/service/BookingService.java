package com.eventmanagement.service;

import com.eventmanagement.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    // TODO (Vithusan): createBooking, updateCount, deleteBooking
}