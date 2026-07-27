import api from "./axios";

export const getAllEvents = () => api.get("/events");

export const getEventById = (id) => api.get(`/events/${id}`);

export const getEventsByOrganizer = (organizerId) =>
    api.get(`/events/organizer/${organizerId}`);

export const createEvent = (eventData) => api.post("/events", eventData);

export const updateEvent = (id, eventData) => api.put(`/events/${id}`, eventData);

export const deleteEvent = (id) => api.delete(`/events/${id}`);