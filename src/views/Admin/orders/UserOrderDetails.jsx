import { useEffect, useState } from "react";
import { getUserOrderDetails } from "../../../services/admin.services";

import OrderDetails from "../../../components/order-details";
import { useParams, Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";

function UserOrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState([]);

    useTitle("Detalle del pedido")

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const orderData = await getUserOrderDetails(id)
                setOrder(orderData);
            } catch(error) {
                console.error("Error al obtener el detalle del pedido", error)
            }
        };
        fetchOrderDetails();
    }, [id]);

    return (
        <div className="container mt-4">
            <h2 className="my-3 border-bottom pb-3">
                <Link 
                    to="/admin/usuarios"
                    title="Volver a pedidos realizados"

                >
                    <i className="bi-arrow-left-circle text-success"></i>
                </Link>
            </h2>
            {order.length == 0 ? (
                <p>No existen detalles para este pedido</p>
            ): (
                <OrderDetails
                    order={order}
                />
            )}
        </div>
    )
}

export default UserOrderDetails