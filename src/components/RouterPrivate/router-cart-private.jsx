import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RouterCartPrivate({ children }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            navigate('/', {
                state: { message: 'Tu carrito esta vacío. Agrega al menos un producto para continar', type: 'warning' }
            });
        } else {
            setLoading(false);
        }
    }, [navigate]);

    if (loading) {
        return null;
    }

    return children;
}

export default RouterCartPrivate;