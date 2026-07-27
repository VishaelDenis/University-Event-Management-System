package com.eventmanagement.model;

import jakarta.persistence.*;

@Entity
@Table(name = "help_requests")
public class Help {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long helpId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User student;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String text;

    // TODO (Kokilaveni): full Help Management logic

    public Help() {}

    public Long getHelpId() { return helpId; }
    public void setHelpId(Long helpId) { this.helpId = helpId; }
    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }
    public Event getEvent() { return event; }
    public void setEvent(Event event) { this.event = event; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
}