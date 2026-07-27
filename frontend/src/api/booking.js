import api from "./axios";

export const getBookingsByStudent = (studentId) => api.get(`/bookings/student/${studentId}`);
export const createBooking = (data) => api.post("/bookings", data);
export const updateBooking = (id, data) => api.put(`/bookings/${id}`, data);
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);
// TODO (Vithusan)