import React, { useEffect, useState } from 'react';
import { getReservas, deleteReserva } from '../../services/reservaService';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaConciergeBell, FaPlus } from 'react-icons/fa';

const ListarReserva = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    const { data } = await getReservas();
    setReservas(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta reserva?')) {
      await deleteReserva(id);
      fetchReservas();
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Reservas</h2>
        <Link to="/reservas/crear" className="btn btn-success">
          <FaPlus className="me-2" />
          Crear Reserva
        </Link>
      </div>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{reserva.fecha}</td>
              <td>{reserva.estado}</td>
              <td>
                <Link to={`/reservas/editar/${reserva.id}`} className="btn btn-warning btn-sm me-2">
                  <FaEdit className="me-1" />
                  Editar
                </Link>
                <Link to={`/reservas/${reserva.id}/servicios`} className="btn btn-info btn-sm me-2">
                  <FaConciergeBell className="me-1" />
                  Ver Servicios
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(reserva.id)}
                >
                  <FaTrash className="me-1" />
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarReserva;