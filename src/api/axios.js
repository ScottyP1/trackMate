import axios from "axios";
const axiosInstance = axios.create({
    baseURL: 'https://track-mate-eight.vercel.app/api', // Backend URL
});


export default axiosInstance;