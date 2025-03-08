import { useState } from "react";
import { validateSubscription } from "../validators/subscriptionValidator";

function SubscriptionForm({ onSubmit, initialValues = {}, buttonText = "Guardar" }) {
    const [formData, setFormData] = useState({
        name: initialValues.name || "",
        price: initialValues.price || "",
        benefits: Array.isArray(initialValues.benefits) 
            ? initialValues.benefits.join(', ')
            : initialValues.benefits || ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateSubscription(formData)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length == 0) {
            const formattedData = {
                ...formData,
                benefits: formData.benefits.split(',').map(benefit => benefit.trim())
            };
            onSubmit(formattedData);
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input 
                    type="text" 
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange}
                    placeholder="Ingresa el nombre de la suscripción"
                    required 
                    aria-describedby="nameError" 
                />
                {errors.name && <div id="nameError" className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="price" className="form-label">Precio</label>
                <input 
                    type="number" 
                    className={`form-control ${errors.price ? 'is-invalid' : ''}`} 
                    id="price" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange}
                    placeholder="Ingresa el precio"
                    required 
                    aria-describedby="priceError" 
                />
                {errors.price && <div id="priceError" className="invalid-feedback">{errors.price}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="benefits" className="form-label">Beneficios</label>
                <div id="benefitsHelp" className="form-text mb-3">Los beneficios deben estar separados por coma ( , )</div>
                <textarea 
                    className={`form-control ${errors.benefits ? 'is-invalid' : ''}`} 
                    id="benefits" 
                    name="benefits" 
                    rows="4"
                    value={formData.benefits} 
                    onChange={handleChange}
                    placeholder="Ingresa los beneficios"
                    required 
                    aria-describedby="benefitsError" 
                ></textarea>
                {errors.benefits && <div id="benefitsError" className="invalid-feedback">{errors.benefits}</div>}
            </div>

            <div className="d-grid mt-4 mb-2">
                <button type="submit" className="btn-send-form">{buttonText}</button>
            </div>
        </form>
    );
}

export default SubscriptionForm;
