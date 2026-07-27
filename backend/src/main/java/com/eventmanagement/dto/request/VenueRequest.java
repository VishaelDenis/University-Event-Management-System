package com.eventmanagement.dto.request;

public class VenueRequest {
    private String name;
    private Integer capacity;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
}