package com.eventmanagement.service;

import com.eventmanagement.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // TODO (Daniel): createFeedback, editText, deleteFeedback
}