import { Link } from 'react-router-dom';
import { FaClipboardList, FaConciergeBell, FaTasks } from 'react-icons/fa';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <div className="container">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <i className="me-2 bi bi-stack"></i> Capa de Presentación Frontend
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link d-flex align-items-center" to="/reservas">
              <FaClipboardList className="me-2" /> Reservas
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link d-flex align-items-center" to="/servicios">
              <FaConciergeBell className="me-2" /> Servicios
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link d-flex align-items-center" to="/reservas/registrar-servicios">
              <FaTasks className="me-2" /> Asignar Reservas a Servicios
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;