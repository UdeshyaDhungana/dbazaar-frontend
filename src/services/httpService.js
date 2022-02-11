import axios from "axios";

const baseUrl = process.env.REACT_APP_HOST;

// axios.interceptors.response.use(null, error => {
//   const expectedError =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status < 500;

//   if (!expectedError) {
//       console.log("The unexpected error is: ", error);
//   }

//   return Promise.reject(error);
// });

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
