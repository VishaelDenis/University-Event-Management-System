export const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();
export const formatTime = (timeStr) => timeStr?.slice(0, 5);