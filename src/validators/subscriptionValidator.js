/**
 * Valida los datos del formulario de suscripciones
 * 
 * @param {Object} formData - Datos del formulario
 * @returns {Object} - Objeto con los errores encontrados
 */
export const validateSubscription = (formData) => {
    const errors = {};

    if (!formData.name.trim()) {
        errors.name = "El nombre es obligatorio.";
    } else if (formData.name.length < 3) {
        errors.name = "El nombre debe tener al menos 3 caracteres.";
    }

    if (!formData.price) {
        errors.price = "El precio es obligatorio.";
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
        errors.price = "El precio debe ser un número positivo.";
    }

    if (!formData.benefits.trim()) {
        errors.benefits = "Al menos un beneficio es obligatorio.";
    } else if (formData.benefits.split(',').length < 1) {
        errors.benefits = "Debes ingresar al menos un beneficio separado por coma.";
    }

    return errors;
};
