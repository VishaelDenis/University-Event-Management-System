package com.eventmanagement.dto.request;

public class BookingRequest {
    private Long eventId;
    private Long studentId;
    private Integer count;

    public Long getEventId() { return eventId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }
    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public Integer getCount() { return count; }
    public void setCount(Integer count) { this.count = count; }
}