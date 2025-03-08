import { useNavigate, Link }  from "react-router-dom";
import { useState }     from "react";

// Servicios
import { create }       from "../../services/subscriptions.services";

// Componentes
import SubscriptionForm from "../../components/subscription-form";
import AlertMessage     from "../../components/alert-message";

function CreateSubscription() {
    const navigate = useNavigate();
    const [alert, setAlert] = useState({ message: '', type: '' });

    const handleCreate = async (data) => {
        try {
            await create(data)
            navigate("/admin/suscripciones", {
                state: { message: "Suscripción creada correctamente", type: "success" },
            });
        } catch (error) {
            console.error('Error al crear la suscripción:', error);
            setAlert({ message: "Error al crear la suscripción", type: "danger" });
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">
                <Link to="/admin/suscripciones">
                    <i className="bi-arrow-left-circle text-success me-2"></i>
                </Link>
                Crear Nueva Suscripción
            </h2>
            <SubscriptionForm 
                onSubmit={handleCreate} 
                buttonText="Crear suscripción" 
            />
        </div>
    );
}

export default CreateSubscription;
