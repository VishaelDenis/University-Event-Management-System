import api from "./axios";

export const getBookingById = (id) => api.get(`/bookings/${id}`);

export const getBookingsByStudent = (studentId) => api.get(`/bookings/student/${studentId}`);

export const getBookingsByEvent = (eventId) => api.get(`/bookings/event/${eventId}`);

export const createBooking = (data) => api.post("/bookings", data);

export const updateBooking = (id, data) => api.put(`/bookings/${id}`, data);

export const deleteBooking = (id) => api.delete(`/bookings/${id}`);