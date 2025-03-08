const apiurl = import.meta.env.VITE_BACK_DOMAIN;

/**
 * Trae la lista de géneros de la api
 * 
 * @returns 
 */
async function getGenres() {
    return fetch(`${apiurl}/api/genres`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener la lista de géneros');
            }
        })
}

/**
 * Obtiene los detalles del género mediante su id
 * 
 * @param {*} id 
 * @returns 
 */
async function getGenreById(id) {
    return fetch(`${apiurl}/api/genres/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener el género');
            }
        })
}

export {
    getGenres,
    getGenreById
}