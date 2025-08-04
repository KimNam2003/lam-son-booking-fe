import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', // fallback nếu .env không có
  withCredentials: true, // dùng khi backend có cookie auth (JWT hoặc session)
  timeout: 10000, // 10 giây timeout
});

// Optional: interceptor xử lý lỗi hoặc token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Ghi log lỗi ra console, hoặc redirect nếu 401
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Optional: interceptor để gắn token nếu dùng localStorage
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
