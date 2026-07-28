package com.eventmanagement.repository;

import com.eventmanagement.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByStudent_UserId(Long studentId);

    List<Booking> findByEvent_EventId(Long eventId);

    boolean existsByEvent_EventIdAndStudent_UserId(Long eventId, Long studentId);
}