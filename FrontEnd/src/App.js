import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Navbar from './components/pages/Navbar';
import ListarReserva from './components/Reservas/ListarReserva';
import CrearReserva from './components/Reservas/CrearReserva';
import EditarReserva from './components/Reservas/EditarReserva';
import RegistrarServicios from './components/Reservas/RegistrarServicios';
import ServiciosRegistrados from './components/Reservas/ServiciosRegistrados';
import ListarServicio from './components/Servicios/ListarServicio';
import CrearServicio from './components/Servicios/CrearServicio';
import EditarServicio from './components/Servicios/EditarServicio';
import './App.css'; // Agregar estilos

const App = () => (
  <Router>
    <Navbar />
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservas" element={<ListarReserva />} />
        <Route path="/reservas/crear" element={<CrearReserva />} />
        <Route path="/reservas/editar/:id" element={<EditarReserva />} />
        <Route path="/reservas/:id/servicios" element={<ServiciosRegistrados />} />
        <Route path="/reservas/registrar-servicios" element={<RegistrarServicios />} />
        <Route path="/servicios" element={<ListarServicio />} />
        <Route path="/servicios/crear" element={<CrearServicio />} />
        <Route path="/servicios/editar/:id" element={<EditarServicio />} />
      </Routes>
    </div>
  </Router>
);

export default App;