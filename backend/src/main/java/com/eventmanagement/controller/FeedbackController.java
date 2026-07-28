package com.eventmanagement.controller;

import com.eventmanagement.dto.request.FeedbackRequest;
import com.eventmanagement.dto.request.FeedbackUpdateRequest;
import com.eventmanagement.dto.response.ApiResponse;
import com.eventmanagement.dto.response.FeedbackResponse;
import com.eventmanagement.exception.ResourceNotFoundException;
import com.eventmanagement.repository.UserRepository;
import com.eventmanagement.service.FeedbackService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;
    private final UserRepository userRepository;

    @Autowired
    public FeedbackController(FeedbackService feedbackService,
                               UserRepository userRepository) {
        this.feedbackService = feedbackService;
        this.userRepository = userRepository;
    }

    /**
     * Resolve logged-in student's ID using the email stored as the JWT
     * subject (set by JwtAuthenticationFilter / CustomUserDetailsService).
     * Requires UserRepository.findByEmail(String) — see README note.
     */
    private Long resolveStudentId(Authentication authentication) {
        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Authenticated user not found: " + email))
                .getUserId();
    }

    /**
     * Create feedback
     */
    @PostMapping
    public ResponseEntity<ApiResponse<FeedbackResponse>> createFeedback(
            Authentication authentication,
            @Valid @RequestBody FeedbackRequest request) {

        Long studentId = resolveStudentId(authentication);

        FeedbackResponse response =
                feedbackService.createFeedback(studentId, request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(
                        "Feedback submitted successfully",
                        response));
    }

    /**
     * Update feedback (text/rating)
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<FeedbackResponse>> editFeedback(
            Authentication authentication,
            @PathVariable Long id,
            @Valid @RequestBody FeedbackUpdateRequest request) {

        Long studentId = resolveStudentId(authentication);

        FeedbackResponse response =
                feedbackService.editText(id, studentId, request);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Feedback updated successfully",
                        response));
    }

    /**
     * Delete feedback
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteFeedback(
            Authentication authentication,
            @PathVariable Long id) {

        Long studentId = resolveStudentId(authentication);

        feedbackService.deleteFeedback(id, studentId);

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Feedback deleted successfully",
                        null));
    }

    /**
     * Get all feedback
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<FeedbackResponse>>> getAllFeedback() {

        return ResponseEntity.ok(
                ApiResponse.success(
                        feedbackService.getAllFeedback()));
    }

    /**
     * Get feedback of the logged-in student
     */
    @GetMapping("/my-feedback")
    public ResponseEntity<ApiResponse<List<FeedbackResponse>>> getMyFeedback(
            Authentication authentication) {

        Long studentId = resolveStudentId(authentication);

        return ResponseEntity.ok(
                ApiResponse.success(
                        feedbackService.getFeedbackByStudent(studentId)));
    }

    /**
     * Get feedback by event
     */
    @GetMapping("/event/{eventId}")
    public ResponseEntity<ApiResponse<List<FeedbackResponse>>> getFeedbackByEvent(
            @PathVariable Long eventId) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        feedbackService.getFeedbackByEvent(eventId)));
    }

    /**
     * Filter feedback by minimum rating
     */
    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<List<FeedbackResponse>>> filterFeedback(
            @RequestParam(required = false) Integer minRating) {

        if (minRating != null) {
            return ResponseEntity.ok(
                    ApiResponse.success(
                            feedbackService.getFeedbackByMinRating(minRating)));
        }

        return ResponseEntity.ok(
                ApiResponse.success(
                        feedbackService.getAllFeedback()));
    }

    /**
     * Average rating for an event
     */
    @GetMapping("/event/{eventId}/average-rating")
    public ResponseEntity<ApiResponse<Double>> getAverageRating(
            @PathVariable Long eventId) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        feedbackService.getAverageRatingForEvent(eventId)));
    }
}
