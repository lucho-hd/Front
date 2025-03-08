import { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"

import useTitle from "../../hooks/useTitle"

import { formatDate } from "../../utils/formatDate";

import { getUserOrders, cancelOrder, reactivateOrder } from "../../services/orders.services";
import { useAuth } from "../../context/AuthContext";


import OrderCard from "../../components/order-card";
import ConfirmationModal from "../../components/confirmation-modal";

function Profile() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const { user } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [subscriptionToCancel, setSubscriptionToCancel] = useState(null);

    useTitle("Mi perfil")

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await getUserOrders(user._id)
                setOrders(ordersData);

                const userSubscriptions = ordersData.filter(order => 
                    order.product_name && order.product_name.includes("Suscripción")
                );
                setSubscriptions(userSubscriptions);
            } catch(error) {
                console.error("Error al obtener los pedidos del usuario: ", error)
            }
        };
        fetchOrders();
    }, []);

    const handleShowCancelModal = (subscription) => {
        setSubscriptionToCancel(subscription);
        setShowModal(true);
    };

    const handleCancelOrder = async () => {
        if (!subscriptionToCancel) return;

        try {
            await cancelOrder(subscriptionToCancel._id);
            
            setSubscriptions((prevSubscriptions) =>
                prevSubscriptions.map((sub) =>
                    sub.order_id === subscriptionToCancel.order_id ? { ...sub, state: "Cancelado" } : sub
                )
            );

            console.log("Suscripción cancelada correctamente");
        } catch (error) {
            console.error("Error al cancelar la suscripción:", error);
        } finally {
            setShowModal(false);
            setSubscriptionToCancel(null);
            navigate("/perfil", {
                state: { message: "¡Suscripción cancelada exitosamente!", type: "success" }
            });
            window.location.reload();
        }
    };

    const handleReactivateOrder = async (subscription) => {
        if (!subscription) return;
    
        try {
            await reactivateOrder(subscription._id);
            
            setSubscriptions((prevSubscriptions) =>
                prevSubscriptions.map((sub) =>
                    sub.order_id === subscription.order_id
                        ? { ...sub, state: "Activa", updated_at: new Date().toISOString() }
                        : sub
                )
            );
    
            console.log("Suscripción reactivada correctamente");
        } catch (error) {
            console.error("Error al reactivar la suscripción:", error);
        } finally {
            navigate("/perfil", {
                state: { message: "¡Suscripción reactivada exitosamente!", type: "success" }
            });
            window.location.reload()
        }
    };

    const handleCancelModal = () => {
        setShowModal(false);
        setSubscriptionToCancel(null);
    };

    return (
        <section className="container-fluid my-4">
            <h2 className="pb-3 border-bottom mt-3 mb-4">
                <Link>
                    <i className="bi-arrow-left-circle text-success me-1"></i>
                </Link>
                Mi cuenta
            </h2>

            <div className="row mt-4 gap-5">
                <div className="col-md-8 col-12">
                    <div className="border p-3 shadow rounded">
                        <h3 className="fw-semibold mt-2 mb-4 fs-4">
                            <i className="bi-bag text-success me-1"></i>
                            Mis pedidos
                        </h3>
                        {orders.length == 0 ? (
                            <p>Aún no has realizado ningún pedido</p>
                        ): (
                            orders.map((order) => (
                                <OrderCard
                                    key={order._id}
                                    order={order}
                                    link={`/perfil/pedido/${order._id}`}
                                />
                            ))
                        )}
                    </div>
                </div>

                <div className="col-md-3 col-12">
                    <div className="border p-3 shadow rounded">
                        <h3 className="fw-semibold mt-2 mb-4 fs-4">
                            <i className="bi-card-checklist test-success me-1"></i>
                            Mis facturas
                        </h3>
                        <span>Aún no se ha generado ninguna factura</span>
                    </div>

                    <div className="border p-3 shadow rounded mt-3">
                        <h3 className="fw-semibold mt-2 mb-4 fs-4">
                            <i className="bi-person text-success me-1"></i>
                            Mis datos
                        </h3>

                        <div className="border px-2 py-3 rounded mb-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="fw-semibodl">Consumidor Final</span>
                                <i className="bi-check-circle text-success"></i>
                            </div>
                            <p className="mt-1 mb-0"><span className="text-success fw-semibold">Nombre: </span>{user.name} {user.surname}</p>
                        </div>
                    </div>

                   {/* Sección de suscripciones */}
                    <div className="border p-3 shadow rounded mt-4">
                        <div className="mt-2 mb-3">
                            <h3 className="fw-semibold mb-2">
                                <i className="bi-cash text-success"></i> Mis suscripciones
                            </h3>
                            <small>En caso de querer cambiar la suscripción por otra, primero cancela la suscripción actual.</small>
                        </div>

                        {subscriptions.length > 0 ? (
                            subscriptions.map((subscription) => (
                                <div key={subscription.order_id} className="d-flex flex-column border px-2 py-3 rounded mb-3">
                                    <span className="fw-semibold mb-1">Nombre: {subscription.product_name}</span>
                                    <p className="mt-1 mb-1 fw-semibold">
                                        Estado: 
                                        <span className={`fw-semibold ms-1 ${subscription.state !== "Cancelado" ? "text-success" : "text-danger"}`}>
                                            {subscription.state}
                                        </span>
                                    </p>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-0">
                                            <span className="fw-semibold">
                                                {subscription.state !== "Cancelado" ? "Activa desde el: " : "Cancelada el: "} 
                                            </span> 
                                            {subscription.state === "Cancelado"
                                                ? formatDate(subscription.updated_at)
                                                : formatDate(subscription?.updated_at || subscription.date_of_purchase)
                                            }
                                        </p>
                                        
                                        {subscription.state !== "Cancelado" ? (
                                            <button 
                                                className="btn btn-danger" 
                                                onClick={() => handleShowCancelModal(subscription)}
                                            >
                                                Cancelar
                                            </button>
                                        ) : (
                                            <button 
                                                className="btn btn-success"
                                                onClick={() => handleReactivateOrder(subscription)}
                                            >
                                                Reactivar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span>Aún no tienes suscripciones activas</span>
                        )}
                        <ConfirmationModal
                            show={showModal}
                            onConfirm={handleCancelOrder}
                            onCancel={handleCancelModal}
                            title="¿Deseas cancelar tu suscripción actual?"
                            message="Si la cancelas, podrás reactivarla nuevamente."
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile