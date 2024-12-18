import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT_URI,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("c_token");
    if (token!==undefined) return config;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      if (error.response?.data.error === "Expired Token") {
        API.auth.refreshToken();
      } else {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

API.auth = {
  login       : (data) => API.post(`/auth/login`, data),
  register    : (data) => API.post(`/auth/register`, data),
  changePassword: (data) => API.post(`/auth/changePassword`, data),
  logout      : () => API.post(`/auth/logout`, {}),
  checkToken  : (token) => API.post(`/auth/checkToken`, {token}),
  refreshToken: () => {}
};

API.dapps = {
  getList       : () => API.get(`/dapps/get`),
  saveAppInfo   : (data) => API.post(`/dapps/save`, data),
  deleteRowById : (rid) => API.post(`/dapps/delete`, { rid }),
};

API.tokens = {
  getData       : () => API.get(`/tokens/get`),
  saveData      : (data) => API.post(`/tokens/save`, data),
  deleteRowById : (rid) => API.post(`/tokens/delete`, { rid }),
};

API.influencer = {
  getData       : () => API.get(`/influencer/get`),
  saveData      : (data) => API.post(`/influencer/save`, data),
  deleteRowById : (rid) => API.post(`/influencer/delete`, { rid }),
};

API.partner = {
  getData       : () => API.get(`/partner/get`),
  saveData      : (data) => API.post(`/partner/save`, data),
  deleteRowById : (rid) => API.post(`/partner/delete`, { rid }),
};

API.advertise = {
  getData       : () => API.get(`/admanage/get`),
  saveData      : (data) => API.post(`/admanage/save`, data),
  deleteRowById : (rid) => API.post(`/admanage/delete`, { rid }),
}
export default API;
