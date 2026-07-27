package com.eventmanagement.repository;

import com.eventmanagement.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    // TODO (Vithusan): custom queries
}