import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

import { useAuth } from '../../context/AuthContext'; 
import { createOrder } from '../../services/orders.services';

import validateCheckOut from '../../validators/checkoutValidator';
import useTitle from '../../hooks/useTitle';
import Loader from '../../components/loader';

// TODO: Terminar validaciones del check

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        dni: '',
        cardNumber: '',
        cvv: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useTitle("Finalizar compra")

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);

        const totalAmount = storedCart.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setTotal(totalAmount);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePayment = (e) => {
        e.preventDefault();
        
        const validationErrors = validateCheckOut(formData);
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
            if (!user) {
                console.error("El usuario no está definido");
                return;
            }

            const productNames = cartItems.map(item => item.title).join(', ');
            const lastDigits = formData.cardNumber.slice(-4);
            const roundedTotal = parseFloat(total.toFixed(2));
    
            const orderData = {
                product_name: productNames,                 
                date_of_purchase: new Date().toISOString().split('T')[0],
                payment_method: `Tarjeta terminada en: ${lastDigits} `,                 
                total: roundedTotal,                               
                state: "Aprobado",                        
                user_id: user._id                    
            };

            createOrder(orderData)
                .then(response => {
                    if (response.ok) {
                        localStorage.removeItem("cart");
                        setLoading(true);
                        setTimeout(() => {
                            navigate("/exito");  
                            window.location.reload();
                        }, 2000);
                    } else {
                        console.error("Error al crear la orden");
                    }
                })
                .catch(error => console.error("Error en la petición:", error));
        }
    };
    

    return (
        <div className="container-fluid mt-4">
            <h2 className="mb-4 pb-3 border-bottom fs-1">Finalizar Compra</h2>
            
            <div className="row gap-5">
                {/* Resumen del Pedido */}
                <div className="col-md-5 col-12 border rounded p-3 ms-2 d-flex flex-column overflow-auto">
                    <h3 className='my-3'>Resumen del Pedido</h3>
                    <ul className="list-group mb-4">
                        {cartItems.map((item, index) => (
                            <li className="list-group-item d-flex justify-content-between" key={index}>
                                <span>{item.quantity}X {item.title}</span>
                                <span>ARS {formatPrice(item.price * item.quantity)}</span>
                            </li>
                        ))}
                    </ul>
                    <span className='mt-auto ms-auto fs-5 fw-semibold'>Total: ARS {formatPrice(total)}</span>
                </div>

                {/* Formulario de Datos del Cliente */}
                <div className="col-md-6 col-12 border rounded py-3 px-4">
                    <h3 className='my-3'>Datos del Cliente</h3>
                    <form className='row'>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label" htmlFor='fullName'>Nombre Completo</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} 
                                name='fullName'
                                id='fullName'
                                value={formData.fullName}
                                onChange={handleChange}
                                required 
                                placeholder='Ingresa tu nombre completo'
                                aria-describedby='fullNameError'
                            />
                            {errors.fullName && <div id='fullNameError' className='invalid-feedback'>{errors.fullName}</div>}
                        </div>
                        <div className="mb-3 col-md-6 col-12">
                            <label className="form-label" htmlFor='email'>Email</label>
                            <input 
                                type="email" 
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                                name='email'
                                id='email'
                                value={formData.email}
                                onChange={handleChange}
                                required 
                                placeholder='Ingresa tu email'
                                aria-describedby='emailError'
                            />
                            {errors.email && <div id='emailError' className='invalid-feedback'>{errors.email}</div>}
                        </div>
                        <div className="mb-3 col-12">
                            <label className="form-label" htmlFor='dni'>DNI</label>
                            <input 
                                type="number" 
                                className={`form-control ${errors.dni ? 'is-invalid' : ''}`} 
                                name='dni'
                                id='dni'
                                value={formData.dni}
                                onChange={handleChange}
                                required 
                                placeholder='Ingresa tu DNI'
                                aria-describedby='dniError'
                            />
                            {errors.dni && <div id='dniError' className='invalid-feedback'>{errors.dni}</div>}
                        </div>
                        
                        <div className='mb-3 col-md-6 col-12'>
                            <label htmlFor='cardNumber' className='form-label'>Número de Tarjeta</label>
                            <input 
                                type='number' 
                                name='cardNumber'
                                className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`} 
                                id='cardNumber'
                                value={formData.cardNumber}
                                onChange={handleChange}
                                placeholder='Ingresa el número de tu tarjeta' 
                                required
                                aria-describedby='cardNumberError'
                            />
                            {errors.cardNumber && <div id='cardNumberError' className='invalid-feedback'>{errors.cardNumber}</div>}
                        </div>

                        <div className='mb-3 col-md-6 col-12 position-relative'>
                            <label htmlFor='cvv' className='form-label'>CVV</label>
                            <input 
                                type='number' 
                                className={`form-control ${errors.cvv ? 'is-invalid' : ''}`} 
                                name='cvv'
                                id='cvv' 
                                value={formData.cvv}
                                onChange={handleChange}
                                placeholder='Ingresa el cvv de tu tarjeta' 
                                style={{ paddingRight: '40px' }} 
                                aria-describedby='cvvError'
                            />
                            <svg style={{ width: '30px', position: 'absolute', top: '75%', right: '10px', transform: 'translateY(-50%)' }}  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor" strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-credit-card"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" /><path d="M3 10l18 0" /><path d="M7 15l.01 0" /><path d="M11 15l2 0" /></svg>
                            {errors.cvv && <div id='cvvError' className='invalid-feedback'>{errors.cvv}</div>}
                        </div>

                        <div className='d-grid mt-5'>
                            <button 
                                type="button" 
                                className="btn btn-success" 
                                onClick={handlePayment}
                            >
                                Pagar
                                {loading && <Loader message={"Procesando pago..."}/>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
