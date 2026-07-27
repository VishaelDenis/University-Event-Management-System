import api from "./axios";

export const getFeedbackByStudent = (studentId) => api.get(`/feedback/student/${studentId}`);
export const createFeedback = (data) => api.post("/feedback", data);
export const updateFeedback = (id, data) => api.put(`/feedback/${id}`, data);
export const deleteFeedback = (id) => api.delete(`/feedback/${id}`);
// TODO (Daniel)