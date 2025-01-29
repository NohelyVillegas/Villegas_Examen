import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReservaById, updateReserva } from '../../services/reservaService';
import { FaEdit, FaUser, FaCalendarAlt, FaInfoCircle, FaCheck } from 'react-icons/fa';

const EditarReserva = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reserva, setReserva] = useState({ clienteId: '', fecha: '', estado: '' });

  useEffect(() => {
    const fetchReserva = async () => {
      const { data } = await getReservaById(id);
      setReserva(data);
    };
    fetchReserva();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserva({ ...reserva, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateReserva(id, reserva);
    navigate('/reservas');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-warning text-white text-center">
          <h2>
            <FaEdit className="me-2" />
            Editar Reserva
          </h2>
        </div>
        <div className="card-body">
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
              <button type="submit" className="btn btn-warning btn-lg">
                <FaEdit className="me-2" />
                Actualizar Reserva
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarReserva;