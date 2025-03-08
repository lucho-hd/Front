import { useEffect, useState } from "react";
import { formatPrice } from "../utils/formatPrice.js";
import { useNavigate } from "react-router-dom";

import { getSubscriptions } from "../services/subscriptions.services.js";
import ConfirmationModal from "./confirmation-modal.jsx";

function SubscriptionCard() {
  const navigate = useNavigate();
  const [subscriptions, setSubscription] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [subscriptionToReplace, setSubscriptionToReplace] = useState(null); 

  useEffect(() => {
    getSubscriptions()
      .then(data => setSubscription(data))
      .catch(error => console.log(error));
  }, []);

  const addToCart = (subscription) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingSubscription = cart.find(item => item.type === "subscription");

    if (existingSubscription) {
      setSubscriptionToReplace(subscription); 
      setShowModal(true);
    } else {
      const newSubscription = {
        id: subscription._id,
        title: `Suscripción ${subscription.name}`,
        price: subscription.price,
        quantity: 1,
        type: "subscription",
      };
      cart.push(newSubscription);
      localStorage.setItem("cart", JSON.stringify(cart));

      navigate("/finalizar-compra", {
        state: { message: "¡Suscripción agregada al carrito!", type: "success" }
      });
      window.location.reload(); 
    }
  };

  const handleConfirmReplace = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const newSubscription = {
      id: subscriptionToReplace._id,
      title: `Suscripción ${subscriptionToReplace.name}`,
      price: subscriptionToReplace.price,
      quantity: 1,
      type: "subscription",
    };

    const index = cart.findIndex(item => item.type === "subscription");
    if (index !== -1) {
      cart[index] = newSubscription;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    navigate("/finalizar-compra", {
      state: { message: "¡Suscripción reemplazada exitosamente!", type: "success" }
    });

    window.location.reload();

    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false); 
  };

  return (
    <>
      {subscriptions.map((subscription) => (
        <article key={subscription._id} className="subscription-card">
          <h3>{subscription.name}</h3>
          <p className="price">ARS {formatPrice(subscription.price)}</p>
          <div className="mb-2">
            <button 
              type="submit" 
              className="banner-button border-0 bg-white"
              onClick={() => addToCart(subscription)}
            >
              Únete ahora
            </button>
          </div>
          <p className="description">
            La suscripción continúa automáticamente. Consulta los 
            <a href="#"> términos</a>.
          </p>
          <ul className="benefits-list">
            {subscription.benefits.map((benefit, index) => (
              <li key={index}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>
        </article>
      ))}

      {/* Modal de Confirmación */}
      <ConfirmationModal 
        show={showModal}
        onConfirm={handleConfirmReplace}
        onCancel={handleCancel}
        title={`¿Deseas reemplazar la suscripción actual por la suscripción ${subscriptionToReplace?.name}?`}
        message="Ya tienes una suscripción en el carrito. ¿Deseas reemplazarla?"
      />
    </>
  );
}

export default SubscriptionCard;
