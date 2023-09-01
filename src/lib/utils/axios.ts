import _axios from 'axios';

const axios = _axios.create({
  baseURL: 'http://localhost:4004/api/',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('auth-user');
      window.location.href = '/auth/login';
    }
  }
);
export default axios;
