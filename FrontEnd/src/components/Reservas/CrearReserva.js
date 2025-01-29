import React, { useState } from 'react';
import { createReserva } from '../../services/reservaService';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaInfoCircle, FaCheck, FaClipboardList } from 'react-icons/fa';

const CrearReserva = () => {
  const [reserva, setReserva] = useState({ clienteId: '', fecha: '', estado: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserva({ ...reserva, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    if (reserva.fecha < today) {
      setError('La fecha no puede ser una fecha pasada.');
      return;
    }
    await createReserva(reserva);
    navigate('/reservas');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-success text-white text-center">
          <h2 className="mb-0">
            <FaClipboardList className="me-2" />
            Crear Reserva
          </h2>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                <FaUser className="me-2 text-primary" />
                ID del Cliente
              </label>
              <input
                type="number"
                className="form-control"
                name="clienteId"
                value={reserva.clienteId}
                onChange={handleChange}
                placeholder="Ingrese el ID del cliente"
                required
                min="0"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <FaCalendarAlt className="me-2 text-warning" />
                Fecha
              </label>
              <input
                type="date"
                className="form-control"
                name="fecha"
                value={reserva.fecha}
                onChange={handleChange}
                placeholder="Ingrese la fecha de la reserva"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <FaInfoCircle className="me-2 text-success" />
                Estado
              </label>
              <input
                type="text"
                className="form-control"
                name="estado"
                value={reserva.estado}
                onChange={handleChange}
                placeholder="Ingrese el estado de la reserva"
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-lg">
                <FaCheck className="me-2" />
                Crear Reserva
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearReserva;