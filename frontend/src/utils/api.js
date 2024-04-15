import axios from "axios"; 

const api = axios.create({
  baseURL : process.env.VITE_SERVER_URL,
});

export default api;