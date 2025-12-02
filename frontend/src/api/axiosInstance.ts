import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';
console.log('API Base URL:', baseURL);
const axiosInstance = axios.create({
  baseURL: baseURL, // Change to your backend base URL if needed
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
