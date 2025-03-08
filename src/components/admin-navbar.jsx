import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminNavbar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="col-auto col-md-auto col-xl-2 px-sm-2 px-0 shadow">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 sticky-top">
                <Link to="/admin/panel" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <h1 className="fs-5 fw-bold d-none d-sm-inline mt-3 text-dark">Gamers Guild</h1>
                </Link>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li className="nav-item">
                        <Link to="/admin/panel" className="nav-link align-middle px-0">
                            <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Inicio</span>
                        </Link>
                    </li>
                    <li>
                        <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Panel</span> <i className="d-none d-sm-inline bi bi-caret-down-fill"></i>
                        </a>
                        <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                            <li className="w-100">
                                <Link to="/admin/juegos" className="nav-link px-0 ms-3">
                                    <i className="fs-4 bi-controller"></i><span className="ms-1 d-none d-sm-inline">Juegos</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/usuarios" className="nav-link px-0 ms-3">
                                    <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Usuarios</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/suscripciones" className="nav-link px-0 ms-3">
                                    <i className="fs-4 bi-box-arrow-in-right"></i> <span className="ms-1 d-none d-sm-inline">Suscripciones</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-arrow-left-circle"></i> <span className="ms-1 d-none d-sm-inline">Volver al sitio</span>
                        </Link>
                    </li>
                </ul>
                <hr />
                <div className="dropdown px-2 pb-4">
                    <a href="#" className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" id="dropdownUsuario" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://i.pravatar.cc/150?img=56" alt="Foto de perfil" width="30" height="30" className="rounded-circle" />
                        <span className="d-none d-sm-inline mx-1 text-dark">
                        {user && user.name && user.surname ? `${user.name} ${user.surname}` : "Mi Perfil"}
                        </span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li className="nav-item">
                            <button className="dropdown-item" onClick={logout}>Cerrar sesión</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
