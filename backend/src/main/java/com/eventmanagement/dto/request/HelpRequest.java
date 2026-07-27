package com.eventmanagement.dto.request;

public class HelpRequest {
    private Long studentId;
    private Long eventId;
    private String text;

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public Long getEventId() { return eventId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
}