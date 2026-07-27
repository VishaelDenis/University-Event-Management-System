import api from "./axios";

export const getAllVenues = () => api.get("/venues");
export const createVenue = (data) => api.post("/venues", data);
export const updateVenue = (id, data) => api.put(`/venues/${id}`, data);
export const deleteVenue = (id) => api.delete(`/venues/${id}`);
// TODO (Nilakshy)