import _axios from 'axios';

const axios = _axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

const unauthPages = ['/auth/register', '/auth/login'];

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('auth-user');
      if (!unauthPages.includes(window.location.pathname)) {
        window.location.href = '/auth/login';
      }
    }
  }
);
export default axios;
