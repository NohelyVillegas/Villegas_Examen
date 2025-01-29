import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaClipboardList, FaTools, FaCheck } from 'react-icons/fa';

const RegistrarServicios = () => {
  const [reservas, setReservas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({ reservaId: '', servicioId: '' });

  useEffect(() => {
    const fetchData = async () => {
      const reservasResponse = await axios.get('http://localhost:8002/api/reservas');
      const serviciosResponse = await axios.get('http://localhost:8003/api/servicios');
      setReservas(reservasResponse.data);
      setServicios(serviciosResponse.data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8002/api/reservas/${form.reservaId}/servicios`, { id: form.servicioId });
    alert('Servicio registrado correctamente');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h2>
            <FaTools className="me-2" />
            Registrar Servicios
          </h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                <FaClipboardList className="me-2 text-secondary" />
                Reserva
              </label>
              <select
                className="form-control"
                name="reservaId"
                value={form.reservaId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una reserva</option>
                {reservas.map((reserva) => (
                  <option key={reserva.id} value={reserva.id}>
                    {reserva.id} - {reserva.clienteId}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">
                <FaTools className="me-2 text-success" />
                Servicio
              </label>
              <select
                className="form-control"
                name="servicioId"
                value={form.servicioId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un servicio</option>
                {servicios.map((servicio) => (
                  <option key={servicio.id} value={servicio.id}>
                    {servicio.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg">
                <FaCheck className="me-2" />
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrarServicios;