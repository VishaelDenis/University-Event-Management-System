import api from './axiosConfig';
// NOTE: this project should already have a shared axios instance set up
// (e.g. api/axiosConfig.js or api/index.js) that attaches the JWT auth
// header — the same one venue.js/booking.js use. If yours has a different
// filename, just update this import path.

const BASE_URL = '/api/feedback';

/**
 * Create a new feedback entry.
 * payload: { eventId?: number|null, rating?: number|null, content: string }
 */
export const createFeedback = async (payload) => {
  const response = await api.post(BASE_URL, payload);
  return response.data;
};

/**
 * Edit the text/rating of an existing feedback entry (author only).
 * payload: { content: string, rating?: number|null }
 */
export const updateFeedback = async (feedbackId, payload) => {
  const response = await api.put(`${BASE_URL}/${feedbackId}`, payload);
  return response.data;
};

/**
 * Delete a feedback entry (author only).
 */
export const deleteFeedback = async (feedbackId) => {
  const response = await api.delete(`${BASE_URL}/${feedbackId}`);
  return response.data;
};

/**
 * Get all feedback (admin/organizer views).
 */
export const getAllFeedback = async () => {
  const response = await api.get(BASE_URL);
  return response.data;
};

/**
 * Get feedback submitted by the currently logged-in student.
 */
export const getMyFeedback = async () => {
  const response = await api.get(`${BASE_URL}/my-feedback`);
  return response.data;
};

/**
 * Get all feedback for a specific event.
 */
export const getFeedbackByEvent = async (eventId) => {
  const response = await api.get(`${BASE_URL}/event/${eventId}`);
  return response.data;
};

/**
 * Get feedback filtered by a minimum rating.
 */
export const getFeedbackByMinRating = async (minRating) => {
  const response = await api.get(`${BASE_URL}/filter`, { params: { minRating } });
  return response.data;
};

/**
 * Get the average rating for a specific event.
 */
export const getAverageRatingForEvent = async (eventId) => {
  const response = await api.get(`${BASE_URL}/event/${eventId}/average-rating`);
  return response.data;
};
