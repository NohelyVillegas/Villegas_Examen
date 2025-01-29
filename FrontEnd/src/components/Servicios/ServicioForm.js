import React, { useState } from 'react';
import axios from 'axios';

const ServicioForm = ({ onSave }) => {
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:8003/api/servicios', form);
    onSave(response.data);
    setForm({ nombre: '', descripcion: '', precio: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <div className="form-group mb-3">
        <label className="form-label">Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label">Descripción:</label>
        <input
          type="text"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label">Precio:</label>
        <input
          type="number"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          required
          className="form-control"
          min="0.01"
          step="0.01"
        />
      </div>
      <button type="submit" className="btn btn-purple">Guardar</button>
    </form>
  );
};

export default ServicioForm;