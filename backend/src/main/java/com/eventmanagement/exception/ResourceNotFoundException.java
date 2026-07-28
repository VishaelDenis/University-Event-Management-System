package com.eventmanagement.exception;

/**
 * Thrown when a requested entity (feedback, event, user, etc.) cannot be found.
 * NOTE: if this class already exists in your repo, don't overwrite it —
 * skip this file and reuse the existing one.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
