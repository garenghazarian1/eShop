import axios from "axios";


const axiosUser = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
});

export default axiosUser;