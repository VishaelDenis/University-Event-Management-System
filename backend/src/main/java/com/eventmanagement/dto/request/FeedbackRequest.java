package com.eventmanagement.dto.request;

public class FeedbackRequest {
    private Long studentId;
    private String text;

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
}