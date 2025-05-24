import axios from 'axios';

const api = axios.create({
  baseURL: 'https://port-0-news-ai-project-9zxht12blqj9n2fu.sel4.cloudtype.app/api',
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;