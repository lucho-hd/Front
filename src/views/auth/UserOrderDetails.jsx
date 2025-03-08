import { useState, useEffect } from "react"
import { getUserOrderDetails } from "../../services/orders.services"

import OrderDetails from "../../components/order-details"
import { useParams, Link } from "react-router-dom"
import useTitle from "../../hooks/useTitle"


function UserOrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState([]);

    useTitle("Detalles del pedido")

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const orderData = await getUserOrderDetails(id)
                setOrder(orderData);
            } catch(error) {
                console.error("Error al traer el detalle del pedido", error)
            }
        };
        fetchOrderDetails();
    }, [id])

    return (
        <section className="container my-3">
            <h2 className="border-bottom pb-3">
                <Link to="/perfil">
                    <i className="bi-arrow-left-circle text-success"></i>
                </Link>
                Detalles del pedido
            </h2>
            {order.length == 0 ? (
                <p>No existen detalles para este pedido</p>
            ): (
                <OrderDetails
                    order={order}
                />
            )}
        </section>
    )
}

export default UserOrderDetails