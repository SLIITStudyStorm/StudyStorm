import axios from "axios"; 

const courseApi = axios.create({
  baseURL : import.meta.env.VITE_COURSE_SERVER_URL+"api",
});

export { courseApi };