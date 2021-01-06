
import axios from 'axios'
import {API_URL} from './constants'


export const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async config => {
    config.headers = { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

async function refreshAccessToken(){
  const data = {"refresh":localStorage.getItem('refresh_token')}
  const response = await axios.post(`${API_URL}/api/auth/jwt/refresh`,data)
  return response.data.access
}

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
    console.log('same')
  return response
}, async function (error) {
    console.log('error')
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {

    originalRequest._retry = true;
    const access_token = await refreshAccessToken();  
    localStorage.removeItem('token')
    localStorage.setItem('token',access_token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});
