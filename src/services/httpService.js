import axios from "axios";
import { getAccessTokenLocal, getRefreshTokenLocal, refreshJwtApi } from "./userService";

const baseUrl = process.env.REACT_APP_HOST;

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setJwt(token);
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  const originalRequest = error.config;

  if (error.response.status === 401 && originalRequest.url === refreshJwtApi) {
      window.location.href = "/";
      return Promise.reject(error);
  }

  if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshTokenLocal()
      refreshToken()
          .then(res => {
              if (res.status === 201) {
                  
                  axios.defaults.headers.common['Authorization'] = 'JWT ' + getAccessTokenLocal()
                  return axios(originalRequest);
              }
          })
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["Authorization"] = `JWT ${jwt}`;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export { baseUrl };
export default http;
