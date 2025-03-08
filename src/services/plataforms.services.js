const apiurl = import.meta.env.VITE_BACK_DOMAIN;

/**
 * Trae la lista de plataformas de la api
 * 
 * @returns 
 */
async function getPlataforms() {
    return fetch(`${apiurl}/api/plataforms`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener la lista de plataformas');
            }
        })
}


/**
 * Trae el detalle de la plataforma mediante su id
 * 
 * @param {*} id 
 * @returns 
 */
async function getPlataformById(id) {
    return fetch(`${apiurl}/api/plataforms/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener la plataforma');
            }
        })
}

export {
    getPlataforms,
    getPlataformById
}