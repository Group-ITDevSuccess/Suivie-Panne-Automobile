import axios from "axios";
import { toast } from "react-hot-toast";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/accounts'
});

// Request interceptor
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        config.headers.Authorization = 'Token ' + token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor
axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const { response } = error;

    if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN');
        toast.error("Login ou Mot de passe Incorrect !");
    } else if (response.status === 404) {
        toast.error("Oups, impossible d'accéder au serveur !");
    } else {
        toast.error("Une erreur est survenue !");
    }

    return Promise.reject(error);
});

export default axiosClient;
