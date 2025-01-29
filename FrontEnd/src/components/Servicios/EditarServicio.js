import React, { useEffect, useState } from 'react';
import { getServicioById, updateServicio } from '../../services/servicioService';
import { useNavigate, useParams } from 'react-router-dom';

const EditarServicio = () => {
  const { id } = useParams();
  const [servicio, setServicio] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServicio = async () => {
      const { data } = await getServicioById(id);
      setServicio(data);
    };
    fetchServicio();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServicio({ ...servicio, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateServicio(id, servicio);
    navigate('/servicios');
  };

  const handleGoBack = () => {
    navigate('/servicios');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-primary">Editar Servicio</h2>
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
        <div className="d-flex justify-content-between mt-4">
          <button type="submit" className="btn btn-purple">
            Actualizar
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleGoBack}>
            Regresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarServicio;