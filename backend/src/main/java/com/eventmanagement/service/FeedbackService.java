package com.eventmanagement.service;

import com.eventmanagement.dto.request.FeedbackRequest;
import com.eventmanagement.dto.request.FeedbackUpdateRequest;
import com.eventmanagement.dto.response.FeedbackResponse;
import com.eventmanagement.exception.BadRequestException;
import com.eventmanagement.exception.ResourceNotFoundException;
import com.eventmanagement.model.Event;
import com.eventmanagement.model.Feedback;
import com.eventmanagement.model.User;
import com.eventmanagement.repository.EventRepository;
import com.eventmanagement.repository.FeedbackRepository;
import com.eventmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    @Autowired
    public FeedbackService(FeedbackRepository feedbackRepository,
                            UserRepository userRepository,
                            EventRepository eventRepository) {
        this.feedbackRepository = feedbackRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    /**
     * Create a new piece of feedback for the logged-in student.
     * eventId is optional (null => general/site feedback).
     */
    public FeedbackResponse createFeedback(Long studentId, FeedbackRequest request) {
        if (request.getContent() == null || request.getContent().trim().isEmpty()) {
            throw new BadRequestException("Feedback content cannot be empty");
        }
        if (request.getRating() != null && (request.getRating() < 1 || request.getRating() > 5)) {
            throw new BadRequestException("Rating must be between 1 and 5");
        }

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + studentId));

        Event event = null;
        if (request.getEventId() != null) {
            event = eventRepository.findById(request.getEventId())
                    .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + request.getEventId()));
        }

        Feedback feedback = new Feedback(student, event, request.getRating(), request.getContent().trim());
        Feedback saved = feedbackRepository.save(feedback);
        return FeedbackResponse.fromEntity(saved);
    }

    /**
     * Edit the text (and optionally rating) of an existing feedback entry.
     * Only the student who authored the feedback may edit it.
     */
    public FeedbackResponse editText(Long feedbackId, Long studentId, FeedbackUpdateRequest request) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found with id: " + feedbackId));

        if (!feedback.getStudent().getUserId().equals(studentId)) {
            throw new BadRequestException("You are not allowed to edit this feedback");
        }

        if (request.getContent() == null || request.getContent().trim().isEmpty()) {
            throw new BadRequestException("Feedback content cannot be empty");
        }
        if (request.getRating() != null && (request.getRating() < 1 || request.getRating() > 5)) {
            throw new BadRequestException("Rating must be between 1 and 5");
        }

        feedback.setContent(request.getContent().trim());
        if (request.getRating() != null) {
            feedback.setRating(request.getRating());
        }

        Feedback updated = feedbackRepository.save(feedback);
        return FeedbackResponse.fromEntity(updated);
    }

    /**
     * Delete a feedback entry. Only the author may delete their own feedback.
     */
    public void deleteFeedback(Long feedbackId, Long studentId) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found with id: " + feedbackId));

        if (!feedback.getStudent().getUserId().equals(studentId)) {
            throw new BadRequestException("You are not allowed to delete this feedback");
        }

        feedbackRepository.delete(feedback);
    }

    public List<FeedbackResponse> getAllFeedback() {
        return feedbackRepository.findAll()
                .stream()
                .map(FeedbackResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public List<FeedbackResponse> getFeedbackByStudent(Long studentId) {
        return feedbackRepository.findByStudent_UserIdOrderByCreatedAtDesc(studentId)
                .stream()
                .map(FeedbackResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public List<FeedbackResponse> getFeedbackByEvent(Long eventId) {
        return feedbackRepository.findByEvent_EventIdOrderByCreatedAtDesc(eventId)
                .stream()
                .map(FeedbackResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public List<FeedbackResponse> getFeedbackByMinRating(Integer minRating) {
        return feedbackRepository.findByRatingGreaterThanEqualOrderByCreatedAtDesc(minRating)
                .stream()
                .map(FeedbackResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public Double getAverageRatingForEvent(Long eventId) {
        return feedbackRepository.findAverageRatingByEventId(eventId);
    }
}
