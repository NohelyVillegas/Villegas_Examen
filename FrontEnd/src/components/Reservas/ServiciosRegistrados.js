import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaTools, FaTrash } from 'react-icons/fa';

const ServiciosRegistrados = () => {
  const { id } = useParams();
  const [servicios, setServicios] = useState([]);

  const fetchServicios = async () => {
    try {
      const response = await axios.get(`http://localhost:8002/api/reservas/${id}/servicios`);
      setServicios(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServicios();
  }, [id]);

  const handleEliminarServicio = async (servicioId) => {
    if (window.confirm('¿Está seguro de que desea eliminar este servicio?')) {
      try {
        await axios.delete(`http://localhost:8002/api/reservas/${id}/servicios/${servicioId}`);
        fetchServicios();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-info text-white text-center">
          <h2>
            <FaTools className="me-2" />
            Servicios Registrados
          </h2>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {servicios.map((servicio) => (
              <li key={servicio.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <FaTools className="me-2" />
                  <span>{servicio.nombre}</span>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleEliminarServicio(servicio.id)}
                >
                  <FaTrash className="me-1" />
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiciosRegistrados;