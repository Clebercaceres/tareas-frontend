import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const register = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const login = (identifier, password) => {
  return axios.post(`${API_URL}/login`, { identifier, password });
};
