package com.eventmanagement.exception;

/**
 * Thrown for invalid/malformed requests (validation failures, ownership
 * violations, etc). NOTE: also listed under Vithusan's Booking Management
 * tasks — if it already exists in the repo, don't overwrite it, just reuse it.
 */
public class BadRequestException extends RuntimeException {

    public BadRequestException(String message) {
        super(message);
    }
}
