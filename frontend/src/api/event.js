import api from './axiosConfig';

export const getAllEvents = async () => {
  const response = await api.get('/api/events');
  return response.data;
};

export const getEventById = async (id) => {
  const response = await api.get(`/api/events/${id}`);
  return response.data;
};

export const getEventsByOrganizer = async (organizerId) => {
  const response = await api.get(`/api/events/organizer/${organizerId}`);
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await api.post('/api/events', eventData);
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await api.put(`/api/events/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await api.delete(`/api/events/${id}`);
  return response.data;
};
