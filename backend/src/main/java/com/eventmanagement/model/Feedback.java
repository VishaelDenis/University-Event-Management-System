package com.eventmanagement.model;

import jakarta.persistence.*;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User student;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String text;

    // TODO (Daniel): full Feedback Management logic

    public Feedback() {}

    public Long getFeedbackId() { return feedbackId; }
    public void setFeedbackId(Long feedbackId) { this.feedbackId = feedbackId; }
    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
}