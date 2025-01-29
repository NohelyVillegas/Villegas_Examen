import React, { useEffect, useState } from 'react';
import { getServicios, deleteServicio } from '../../services/servicioService';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const ListarServicios = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    fetchServicios();
  }, []);

  const fetchServicios = async () => {
    const { data } = await getServicios();
    setServicios(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este servicio?')) {
      await deleteServicio(id);
      fetchServicios();
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">Servicios</h2>
        <Link to="/servicios/crear" className="btn btn-purple">
          <FaPlus className="me-2" />
          Crear Servicio
        </Link>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Creado en</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio) => (
            <tr key={servicio.id}>
              <td>{servicio.id}</td>
              <td>{servicio.nombre}</td>
              <td>{servicio.descripcion}</td>
              <td>{servicio.precio}</td>
              <td>{new Date(servicio.creadoEn).toLocaleDateString()}</td>
              <td>
                <Link to={`/servicios/editar/${servicio.id}`} className="btn btn-warning btn-sm me-2">
                  <FaEdit className="me-1" />
                  Editar
                </Link>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(servicio.id)}
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

export default ListarServicios;