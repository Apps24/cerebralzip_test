import axios from 'axios';

const BASE_URL = 'http://3.111.196.92:8020/api/v1';

// Create a regular axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API call failed:', error);
    return Promise.reject(error);
  }
);

// Create an axios instance with basic authentication
const axiosAuthInstance = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: 'trial',
    password: 'assignment123',
  },
});

// Optional: Export both instances if needed
export { axiosInstance, axiosAuthInstance };
