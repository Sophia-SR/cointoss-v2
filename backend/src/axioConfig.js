import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000, // Increase timeout to 10 seconds
});

export default axiosInstance;
