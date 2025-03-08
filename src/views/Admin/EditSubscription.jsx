import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Servicios
import { update } from "../../services/subscriptions.services";
import { getSubscriptionById } from "../../services/subscriptions.services";

// Componentes
import SubscriptionForm from "../../components/subscription-form";
import AlertMessage from "../../components/alert-message";

function EditSubscription() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [subscription, setSubscription] = useState(null);
    const [alert, setAlert] = useState({ message: '', type: '' });

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const subscriptionData = await getSubscriptionById(id)
                setSubscription(subscriptionData);
            } catch(error) {
                console.log("Error al obtener los datos de la suscripción: ", error)
            }
        };
        fetchSubscription();
    }, [id]);

    const handdleUpdate = async (updatedData) => {
        try {
            await update(id, updatedData);
            navigate("/admin/suscripciones", {
                state: { message: "Suscripción actualizada exitosamente!", type: "success" },
            });
        } catch (error) {
            console.error("Error al actualizar la suscripción: ", error)
            setAlert({ message: "Error al actualizar la suscripción", type: "danger" });
        }
    }

    return (
        <div className="conatainer-fluid">
            {alert.message && <AlertMessage message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />}
            
            <h2 className="my-3">
                <Link to="/admin/suscripciones" className="text-success me-2">
                    <i className="bi-arrow-left-circle"></i>
                </Link>
                Editar {subscription?.name}
            </h2>

            {subscription && 
                <SubscriptionForm 
                    initialValues={subscription}
                    onSubmit={handdleUpdate}
                    buttonText={`Actualizar ${subscription.name}`}
                />
            }
        </div>
    )
}

export default EditSubscription