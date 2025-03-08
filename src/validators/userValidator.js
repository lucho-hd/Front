/**
 * Valida los datos del formulario para crear un usuario
 * 
 * @param {*} user 
 */
export const validateUser = (user) => {
    const errors = {};

    if (!user.name.trim()) {
        errors.name = "El nombre es obligatorio.";
    }  

    if (!user.surname.trim()) {
        errors.surname = "El apellido es obligatorio.";
    }

    if (!user.email.trim()) {
        errors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
        errors.email = "El email ingresado es inválido.";
    }

    if (!user.password.trim()) {
        errors.password = "La contraseña es obligatoria.";
    } else if (user.password.length < 4) {
        errors.password = "La contraseña debe tener al menos 4 caracteres.";
    }

    return errors;
}