import React, { useState } from 'react';
import { createServicio } from '../../services/servicioService';
import { useNavigate } from 'react-router-dom';

const CrearServicio = () => {
  const [servicio, setServicio] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    creadoEn: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServicio({ ...servicio, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const servicioConFecha = {
        ...servicio,
        creadoEn: new Date(),
      };
      await createServicio(servicioConFecha);
      alert('Servicio creado exitosamente');
      navigate('/servicios');
    } catch (error) {
      console.error('Error al crear servicio:', error);
      alert('Hubo un error al crear el servicio. Por favor, inténtelo nuevamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-primary">Crear Servicio</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={servicio.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Descripción</label>
          <input
            type="text"
            className="form-control"
            name="descripcion"
            value={servicio.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            value={servicio.precio}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
          />
        </div>
        <button type="submit" className="btn btn-purple">Crear</button>
      </form>
    </div>
  );
};

export default CrearServicio;