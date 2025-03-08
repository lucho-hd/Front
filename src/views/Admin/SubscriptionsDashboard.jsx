// Servicios
import * as SubscriptionsService from "../../services/subscriptions.services.js";

// Hooks
import useTitle from "../../hooks/useTitle";

// React
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Componentes
import AdminTable from "../../components/admin-table";
import AlertMessage from "../../components/alert-message";
import DeleteModal from "../../components/delete-modal";


import { formatPrice } from "../../utils/formatPrice";

function SubscriptionsDashboard() {
    const location = useLocation();
    const [alert, setAlert] = useState(location.state || { message: '', type: '' });

    useTitle("Administrar Suscripciones");

    const [subscriptions, setSubscriptions ] = useState([]);
    const [selectedSubscription, setSelectedSubscription] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        SubscriptionsService.getSubscriptions()
            .then(setSubscriptions)
            .catch(error => console.error("Error al obtener las suscripciones", error))

            if (location.state) {
                window.history.replaceState({}, document.title);
            }
    }, [location.state]);

    const handleDeleteClick = (subscription) => {
        if (subscription) {
            setSelectedSubscription(subscription);
            setShowModal(true);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await SubscriptionsService.deleteOne(selectedSubscription._id);
            setSubscriptions(prevSubscriptions => prevSubscriptions.filter(subscription => subscription._id !== selectedSubscription._id ));
            setAlert({ message: "¡Suscripción eliminada exitosamente!", type: "success" });
        } catch(error) {
            setAlert({ message: "Error al eliminar la suscripción", type: "danger" });
        } finally {
            setShowModal(false);
            setSelectedSubscription(null)
        }    
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setSelectedGame(null);
    };

    const columns = [
        { key: "_id", label: "#",  className:"table-item" },
        { key: "name", label: "Nombre",  className:"table-item" },
        { 
            key: "price", 
            label: "Precio", 
            className: "table-item",
            render: (subscription) => formatPrice(subscription.price)
        },
        { 
            key: "benefits", 
            label: "Beneficios", 
            render: (subscription) => 
                <ul className="benefits-list">
                    {subscription.benefits.map((benefit) => (
                        <li key={benefit}>
                             <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z" />
                            </svg>
                            {benefit}
                        </li>
                    ))}
                </ul>                
        },
    ]

    return (
        <div>
            {alert.message && 
                <AlertMessage 
                    message={alert.message} 
                    type={alert.type} 
                    onClose={() => setAlert({ message: '', type: '' })}
                />
            }

            <AdminTable
                title="Administrar Suscripciones"
                link="/admin/suscripciones/crear"
                textBtn="Crear nueva suscripción"
                caption="Lista de suscripciones disponibles en el sitio"
                columns={columns}
                data={subscriptions}
                renderActions={(subscription) => (
                    <div className="d-flex flex-column my-4">
                        <Link className="btn btn-primary mb-3" to={`/admin/suscripciones/editar/${subscription._id}`}>
                            Editar
                        </Link>
                        <button
                            className="btn btn-danger mb-sm-1"
                            onClick={() => handleDeleteClick(subscription)}
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            />

            <DeleteModal
                title={`¿Eliminar suscripción ${selectedSubscription?.name}?`}
                message={`¿Estás seguro de que deseas eliminar la suscripción ${selectedSubscription?.name}. Esta acción es irreversible`}
                show={showModal}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    )
}

export default SubscriptionsDashboard
