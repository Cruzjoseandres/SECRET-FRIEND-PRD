import axios from "axios";
import { getAccessToken } from "../utils/TokenUtilities";
import { API_URL } from "./apiConfig";

const getAllSorteos = () => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/usuarios/sorteo`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}

const getSorteoById = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/sorteos/${id}`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
            .then((response) => {
                const docente = response.data;
                resolve(docente);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}
const createSorteo = (sorteo) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/sorteos`, sorteo, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
            .then((response) => {
                const nuevoDocente = response.data;
                resolve(nuevoDocente);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}
const updateSorteo = (id, sorteo) => {
    return new Promise((resolve, reject) => {
        axios.put(`${API_URL}/sorteos/${id}`, sorteo, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
            .then((response) => {
                const updatedDocente = response.data;
                resolve(updatedDocente);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}
const deleteSorteo = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${API_URL}/sorteos/${id}`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}


const habilitarSorteo = (link) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/sorteos/${link}/habilitar`, {}, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}

const deshabilitarSorteo = (link) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/sorteos/${link}/deshabilitar`, {}, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}

const realizarSorteo = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/participantes/sorteo/${id}`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}

const getSorteoByLink = (link) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/sorteos/${link}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}

export { getSorteoById, createSorteo, updateSorteo, getAllSorteos, deleteSorteo, habilitarSorteo, deshabilitarSorteo, realizarSorteo, getSorteoByLink };