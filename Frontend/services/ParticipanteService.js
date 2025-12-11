import axios from "axios";
import { API_URL } from "./apiConfig";

const createParticipante = (link, participante) => {
    return new Promise((resolve, reject) => {

        axios.post(`${API_URL}/participantes/${link}`, participante, {
        })
            .then((response) => {
                const nuevoParticipante = response.data;
                resolve(nuevoParticipante);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}

const getParticipanteByToken = (linkParticipante) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/participantes/${linkParticipante}`,

        )
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}

const addWishlistItem = (token, wishlist) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/participantes/${token}/wishlist`, { wishlist })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}

const loginParticipante = (link, identificadorUnico) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/sorteos/${link}/participantes/login`, { identificadorUnico })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}

export { createParticipante, getParticipanteByToken, addWishlistItem, loginParticipante };