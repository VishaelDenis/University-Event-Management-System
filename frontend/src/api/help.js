import api from "./axios";

export const getHelpByStudent = (studentId) => api.get(`/help/student/${studentId}`);
export const createHelp = (data) => api.post("/help", data);
export const updateHelp = (id, data) => api.put(`/help/${id}`, data);
export const deleteHelp = (id) => api.delete(`/help/${id}`);
// TODO (Kokilaveni)