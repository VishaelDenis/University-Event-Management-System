package com.eventmanagement.config;

/**
 * FOR LOCAL/STANDALONE TESTING ONLY.
 *
 * On startup, seeds one student, one organizer, one venue, and one event
 * (only if the dummy student doesn't already exist) so the feedback
 * endpoints have real rows to attach to. Delete this once real data / real
 * signup flows exist, or once you're testing against the full team repo.
 */

import com.eventmanagement.model.Event;
import com.eventmanagement.model.User;
import com.eventmanagement.model.Venue;
import com.eventmanagement.repository.EventRepository;
import com.eventmanagement.repository.UserRepository;
import com.eventmanagement.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class DummyDataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final VenueRepository venueRepository;
    private final EventRepository eventRepository;

    @Value("${dummy.user.email:student@test.com}")
    private String dummyUserEmail;

    public DummyDataSeeder(UserRepository userRepository,
                            VenueRepository venueRepository,
                            EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.venueRepository = venueRepository;
        this.eventRepository = eventRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.findByEmail(dummyUserEmail).isPresent()) {
            return; // already seeded
        }

        User student = userRepository.save(
                new User(dummyUserEmail, "not-a-real-hash", "Dummy Student", User.Role.STUDENT));

        User organizer = userRepository.save(
                new User("organizer@test.com", "not-a-real-hash", "Dummy Organizer", User.Role.ORGANIZER));

        Venue venue = venueRepository.save(new Venue("Main Auditorium", 200, "Campus Center"));

        eventRepository.save(new Event(
                venue,
                organizer,
                "Welcome Week Kickoff",
                "A dummy seeded event for testing the feedback module.",
                LocalDate.now().plusDays(7),
                LocalTime.of(14, 0),
                150));

        System.out.println("[DummyDataSeeder] Seeded dummy student '" + dummyUserEmail
                + "', organizer, venue, and one event for feedback testing.");
    }
}
