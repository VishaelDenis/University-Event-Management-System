import api from "./axios";

export const getAllUsers = () => api.get("/users");
export const updateUserRole = (id, role) => api.put(`/users/${id}/role`, { role });
export const deleteUser = (id) => api.delete(`/users/${id}`);
// TODO (Karikalan)