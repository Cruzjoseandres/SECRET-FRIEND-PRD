import axios from "axios";
import { API_URL } from "./apiConfig";

const login = (loginData) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/usuarios/login`, loginData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}

const register = (registerData) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/usuarios/register`, registerData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}

export { login, register };