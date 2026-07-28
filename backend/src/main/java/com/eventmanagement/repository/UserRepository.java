package com.eventmanagement.repository;

/**
 * DUMMY / STAND-IN — this is Karikalan's file in the real repo. If it
 * already exists there, do NOT copy this in — instead just make sure his
 * version has the findByEmail() method (see backend/UserRepository-PATCH-NEEDED.txt).
 */

import com.eventmanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
