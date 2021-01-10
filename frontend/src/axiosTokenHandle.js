
import axios from 'axios'
import {API_URL} from './constants'


export const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async config => {
    config.headers = { 
      'Authorization': `Bearer ${localStorage['token']}`,
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

export async function refreshAccessToken(){
  //Update access token if refresh token is valid and save access token in localstorage
  const data = {"refresh":localStorage['refresh_token']}
  try {
    const response = await axios.post(`${API_URL}/api/auth/jwt/refresh`,data)
    localStorage.removeItem('token')
    localStorage.setItem('token',response.data.access)
    return true
  }
  catch (err) {
    return false
  }
}

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const accessTokenUpdated = await refreshAccessToken();  
    console.log(originalRequest)
    if (accessTokenUpdated === false){
      return false
    }
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    // If send post request to verify endpoint with token in post data  ex. {token:"example"} update recieved access token after use refresh token in request
    const endpoint = originalRequest.url.substring(originalRequest.url.lastIndexOf('/') + 1)
    if ("data" in originalRequest && originalRequest.data !== undefined && 'token' in JSON.parse(originalRequest.data) && endpoint === "verify"){
      originalRequest.data = {"token":localStorage.getItem('token')}
    }

    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});
