/**
 * Valida los datos ingresados en los campos para finalizar el proceso de compra
 * 
 * @param {*} data - Los datos ingresados en el formulario para finalizar una compra (Nombre completo, email, Número de tarjeta y CVV)
 */
export const validateCheckOut = (data) => {
    const errors = {};

    if (!data.fullName || data.fullName.trim() === "") {
        errors.fullName = "El nombre completo es obligatorio";
    }

    if (data.email.trim() === "") {
        errors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "El email ingresado es inválido.";
    }

    if (data.dni.trim() === "") {
        errors.dni = "El DNI es obligatorio";
    } else if (!/^\d{8}$/.test(data.dni)) {
        errors.dni = "El DNI debe tener exactamente 8 dígitos";
    }
    
    if (data.cardNumber.trim() === "") {
        errors.cardNumber = "El número de tarjeta es obligatorio";
    } else if (!/^\d{16}$/.test(data.cardNumber)) {
        errors.cardNumber = "El número de tarjeta debe tener exactamente 16 dígitos";
    }
    
    if (data.cvv.trim() === "") {
        errors.cvv = "El CVV es obligatorio";
    } else if (!/^\d{3}$/.test(data.cvv)) {
        errors.cvv = "El CVV debe tener exactamente 3 dígitos";
    }
    
    return errors;
}

export default validateCheckOut