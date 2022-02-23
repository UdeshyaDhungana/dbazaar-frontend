import axios from "axios";
import { refreshToken, saveToken } from "./userService";

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
},
  function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return refreshToken()
        .then(res => {
          if (res.status === 201) {
            // 1) put token to LocalStorage
            saveToken(res.data)

            // 2) Change Authorization header
            setJwt(localStorage.getItem('accessToken'));

            // 3) return originalRequest object with Axios.
            return axios(originalRequest);
          }
        })
    }
  }
)

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
