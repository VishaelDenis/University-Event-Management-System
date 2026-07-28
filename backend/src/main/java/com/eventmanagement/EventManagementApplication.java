package com.eventmanagement;

/**
 * DUMMY / STAND-IN main class — only needed if the real repo doesn't
 * already have a @SpringBootApplication entry point. If it does, skip this
 * file entirely (a second one causes "unable to find a single main class"
 * or component-scan conflicts).
 */

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EventManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(EventManagementApplication.class, args);
    }
}
