import { Link } from "react-router-dom"
import {  useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const [cartItems, setCartItems] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
    
        const updateCartItems = () => {
            const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
            const totalItems = storedCart.reduce((acc, item) => acc + item.quantity, 0);
            setCartItems(totalItems);
        };
    
        updateCartItems();
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg navbar-light bg-light sticky-top ${scrolled ? 'shadow' : ''}`}>
            <div className="container-fluid mx-lg-2">
                {/* <!-- Botón de Navegación --> */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="offcanvas" 
                    data-bs-target="#menuLateral"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* <!-- Logo y Nombre de la Tienda --> */}
                <Link to="/" className="navbar-brand text-dark mx-auto fw-bold fs-3">
                    Gamers Guild
                </Link>

                {/* <!-- Contenido del Navbar --> */}
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="menuLateral">
                    <div className="offcanvas-header">
                        <h1 className="offcanvas-title fs-3">Gamers Guild</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
                    </div>
                    <div className="offcanvas-body">
                        {/* <!-- Links de Inicio, Juegos y Play Pass--> */}
                        <ul className="navbar-nav mx-auto mb-lg-3 mt-lg-3">
                            <li className="nav-item fw-semibold">
                                <Link className="nav-link" to="/">Inicio</Link>
                            </li>

                            <li className="nav-item fw-semibold">
                                <Link className="nav-link" to="/juegos">Juegos</Link>
                            </li>

                            <li className="nav-item fw-semibold">
                                <Link className="nav-link" to="/playpass">Play Pass</Link>
                            </li>
                        </ul>       

                        { !isAuthenticated && (
                            <ul className="navbar-nav mt-lg-3 me-2">
                                <li className="nav-item fw-semibold">
                                    <Link className="nav-link" to="/iniciar-sesion">Iniciar Sesión</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link button-register" to="/crear-cuenta">
                                        <i className="bi-plus-circle"> </i>
                                        Crear Cuenta
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>

                <div className="d-flex align-items-center">
                    {/* <!-- Carrito de compras --> */}
                    <Link to="/carrito" className="cart-icon mt-1 me-4 position-relative" title="Ver carrito de compras">
                        <i className="bi-cart fs-5"></i>
                        <span className="position-absolute ms-1 top-50 start-100 translate-middle badge rounded bg-success text-white fw-semibold">{cartItems}</span>
                    </Link>
                </div>

                { isAuthenticated && (
                    <div className="dropdown-center dropdown-menu-end mt-3">
                        <span className="dropdown-toggle fw-semibold d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img 
                                src="https://i.pravatar.cc/150?img=56" 
                                alt={`Foto de perfil de ${user.email}`} 
                                width="30" 
                                height="30" 
                                className="rounded-circle me-2"
                            />
                           <span className="d-none d-md-inline">{user && user.name && user.surname ? `${user.name} ${user.surname}` : "Mi Perfil"}</span>
                        </span>
                        <ul className="dropdown-menu dropdown-menu-end" style={{ maxWidth: '250px' }}>
                            { user.role === "admin" && (
                                <li><Link className="dropdown-item" to="/admin/panel">Ir a admin</Link></li>
                            )}
                            <li><Link className="dropdown-item" to="/perfil">Mi perfil</Link></li>
                            <li>
                                <button className="dropdown-item" onClick={logout}>Cerrar sesión</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar;