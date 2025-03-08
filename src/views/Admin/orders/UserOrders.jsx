import { useState, useEffect } from "react";
import { getUserOrders } from "../../../services/admin.services";

import OrderCard from "../../../components/order-card";
import { useParams } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";

function UserOrders() {
    const { id } = useParams();  
    const [orders, setOrders] = useState([]); 

    useTitle("Pedidos realizados por el usuario")
    
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await getUserOrders(id)
                setOrders(ordersData);
            } catch(error) {
                console.error("Error al obtener los pedidos del usuario: ", error);
            }
        };
        fetchOrders();
    }, [id]);

    return (
        <div className="container mt-4 border p-4 rounded">
            <h2 className="fw-semibold mb-4 fs-3">
                <i className="bi-bag text-success"></i>
                Pedidos realizados por el usuario
            </h2>
            {orders.length == 0 ? (
                <p>El usuario no ha realizado ningún pedido</p>
            ): (
                orders.map((order) => (
                    <OrderCard
                        key={order._id}
                        order={order}
                        link={`/admin/pedido/${order._id}/detalle`}
                    />
                ))
            )}
        </div>
    )
}

export default UserOrders