// FOR LOCAL/STANDALONE TESTING ONLY.
// Skip this file if the real repo already has api/axiosConfig.js (or
// similarly-named shared axios instance) — just point feedback.js's import
// at that one instead.
//
// The dummy backend (DummySecurityConfig) fakes a logged-in user for every
// request regardless of headers, so no real auth token is required here.
// Once real JWT login exists, add the Authorization header back in the
// request interceptor below.

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Uncomment once real login/JWT exists:
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
