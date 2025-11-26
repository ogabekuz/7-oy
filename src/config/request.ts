import axios from "axios";

const request = axios.create({ baseURL: "https://9mbn3t91-3000.euw.devtunnels.ms/api/v1" });

request.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer token`;

  return config;
});



export { request };
