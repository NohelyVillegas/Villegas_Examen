import axios from 'axios';

const API_URL = 'http://localhost:8003/api/servicios';

export const getServicios = () => axios.get(API_URL);
export const getServicioById = (id) => axios.get(`${API_URL}/${id}`);
export const createServicio = (servicio) => axios.post(API_URL, servicio);
export const updateServicio = (id, servicio) => axios.put(`${API_URL}/${id}`, servicio);
export const deleteServicio = (id) => axios.delete(`${API_URL}/${id}`);