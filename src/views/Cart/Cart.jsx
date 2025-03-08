import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useTitle  from "../../hooks/useTitle.js";
import { formatPrice } from "../../utils/formatPrice.js";

import Loader from "../../components/loader.jsx";

/**
 * Carrito de compras
 * @returns 
 */
function Cart () {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    useTitle("Mi carrito")

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
        calculateTotal(storedCart);
    },[]);

    const calculateTotal = (cart) => {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotalItems(totalItems);
        setTotalPrice(totalPrice);
    };

    const handleDelete = (id) => {
        const updatedCart = cart.filter(product => product.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        calculateTotal(updatedCart)
        navigate("/carrito", {
            state: { message: "¡Producto eliminado exitosamente del carrito!", type: "success" }
        });
        window.location.reload();
    }

    const handleCheckout = () => {
        setLoading(true);
        setTimeout(() => {
            navigate('/finalizar-compra');
        }, 2000);
    };

    return (
        <section className="container-fluid my-5">
            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mx-2">
                <h2 className="fw-semibold">Carrito de Compras</h2>
                <Link to="/juegos" className="text-success fw-semibold">Continuar comprando</Link>
            </div>
            {cart.length === 0 ? (
                <p className="mt-3 fs-5 mx-2">Tu carrito está vacío. Elige algún producto de nuestra tienda para continuar.</p>
            ) : (
                <div className="row justify-content-between my-4 mx-2">
                    <div className="col-md-6 col-12">
                        <div className="d-flex flex-column gap-5">
                            {cart.map((product) => (
                                <article key={product.id} className="d-flex flex-column flex-sm-row border p-3 mb-3 rounded">
                                    <div className="d-flex justify-content-between w-100">
                                        <div className="d-flex">
                                            <img 
                                                src={product.cover} 
                                                alt={product.title} 
                                                className="img-carrito img-fluid" 
                                            />
                                            <div className="ms-3">
                                                <h3 className="fs-4">{product.title}</h3>
                                                <div className="d-flex flex-column">
                                                <p className="fw-semibold text-success fs-5">
                                                    ARS {formatPrice(Number(product.price))}
                                                </p>
                                                <span className="cart-price">
                                                    {product.quantity} X ARS$ {formatPrice(Number(product.price) * product.quantity)}
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                        <form className="ms-3" onSubmit={(e) => {
                                            e.preventDefault();
                                            handleDelete(product.id);
                                        }}>
                                            <button 
                                                type="submit"
                                                className="btn btn-danger btn-sm"
                                                title={`Eliminar: ${product.title}`}
                                            >
                                                <i className="bi-trash-fill"></i> Eliminar
                                            </button>
                                        </form>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-4 col-12 sticky-form h-100">
                        <div className="d-flex flex-column py-3 px-4 text-dark bg-products rounded">
                            <h3 className="fw-semibold fs-4">Resumen del pedido</h3>
                            <div className="d-flex justify-content-between my-3">
                                <span className="fw-semibold">Artículos ({totalItems}):</span>
                                <span className="fw-semibold">ARS {formatPrice(totalPrice)}</span>
                            </div>
                            <div className="d-flex my-3 justify-content-between border-dark border-top border-bottom py-4">
                                <span className="fw-semibold"> Total:</span>
                                <span className="fw-semibold">ARS {formatPrice(totalPrice)}</span>
                            </div>
                            <div className="mt-3 d-grid">
                                <Link onClick={handleCheckout} className="btn-send-form btn-send-form">
                                    Finalizar compra
                                    {loading && <Loader message={"Cargando..."} />}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Cart;
