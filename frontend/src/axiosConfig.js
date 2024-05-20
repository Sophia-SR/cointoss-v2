import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // Replace with your backend URL
  timeout: 10000, // 10 seconds timeout
});

export default axiosInstance;
