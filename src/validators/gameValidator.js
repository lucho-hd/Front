/**
 * Valida los datos del formulario de suscripciones
 * 
 * @param {Object} game - Datos del formulario
 * @returns {Object} - Objeto con los errores encontrados
 */
export const validateGame = (game) => {
    const errors = {};

    if (!game.title.trim()) {
        errors.title = "El título es obligatorio.";
    } else if (game.title.length < 3) {
        errors.title = "El título debe tener al menos 3 caracteres.";
    }

    if (!game.price) {
        errors.price = "El precio es obligatorio.";
    } else if (isNaN(game.price) || Number(game.price) <= 0) {
        errors.price = "El precio debe ser un número positivo.";
    }

    if (!game.release_date) {
        errors.release_date = "La fecha de lanzamiento es obligatoria.";
    }

    if (!game.description.trim()) {
        errors.description = "La descripción es obligatoria.";
    } else if (game.description.length < 10) {
        errors.description = "La descripción debe tener al menos 10 caracteres.";
    }

    if (!game.company.trim()) {
        errors.company = "La compañía es obligatoria.";
    }

    if (game.genres.length === 0) {
        errors.genres = "Debes seleccionar al menos un género.";
    }

    if (game.plataforms.length === 0) {
        errors.plataforms = "Debes seleccionar al menos una plataforma.";
    }

    if (!game.cover_description.trim()) {
        errors.cover_description = "La descripción de la portada es obligatoria.";
    } else if (game.cover_description.length < 5) {
        errors.cover_description = "La descripción de la portada debe tener al menos 5 caracteres.";
    }

    return errors;
}