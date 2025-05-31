// src/api.js (или аналогичный файл)
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://my-django-backend-q997.onrender.com",
});

export default api;