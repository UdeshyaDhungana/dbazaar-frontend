import axios from "axios";

const baseUrl = process.env.REACT_APP_HOST;

axios.interceptors.request.use()

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
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
