import axios from 'axios';

const API_URL = 'http://localhost:8002/api/reservas';

export const getReservas = () => axios.get(API_URL);
export const createReserva = (reserva) => axios.post(API_URL, reserva);
export const deleteReserva = (id) => axios.delete(`${API_URL}/${id}`);
export const getReservaById = (id) => axios.get(`${API_URL}/${id}`);
export const updateReserva = (id, reserva) => axios.put(`${API_URL}/${id}`, reserva);
