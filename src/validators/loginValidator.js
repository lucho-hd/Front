/**
 * Valida el inicio de sesión de un usuario
 * 
 * @param {*} email - Las credenciales para el inicio de sesión del usuario
 * @param {*} password
 */
export const validateLogin = (email, password) => {
    const errors = {};

    if (email == "") {
        errors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "El email ingresado es inválido.";
    }

    if (password == "") {
        errors.password = "La contraseña es obligatoria.";
    } else if (password.length < 4) {
        errors.password = "La contraseña debe tener al menos 4 caracteres.";
    }

    return errors;
}