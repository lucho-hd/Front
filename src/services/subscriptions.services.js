const apiurl = import.meta.env.VITE_BACK_DOMAIN;

/**
 * Trae todas las suscripciones desde la api
 * @returns 
 */
async function getSubscriptions() {
    return fetch(`${apiurl}/api/subscriptions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener la lista de suscripciones');
            }
        })
}

/**
 * Trae los datos de una suscripción mediante su id
 * 
 * @param {*} id - El id de la suscripción 
 */
async function getSubscriptionById(id) {
    return fetch(`${apiurl}/api/subscriptions/${id}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener la suscripción');
            }
        })
}

/**
 * Crea una nueva suscripción
 * 
 * @param {*} name - El nombre de la suscripción
 * @param {*} price - El precio de la suscripción
 * @param {*} benefits - Los beneficios de la suscripción
 * @returns 
 */
async function create(data) {
    return fetch(`${apiurl}/api/subscriptions`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    })
}

/**
 * Actualiza una suscripción mediante su id
 * 
 * @param {*} id - El id de la suscripción a editar
 * @param {*} data - Los datos de la suscripción
 * @returns 
 */
async function update(id, data) {
    return fetch(`${apiurl}/api/subscriptions/${id}`, {
        method : 'PUT',
        headers: {
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem("token")
        },
        body: JSON.stringify(data)
    })
}

/**
 * Elimina los datos de una suscripción
 * 
 * @param {*} id - El id de la suscripción 
 */
async function deleteOne(id) {
    return fetch(`${apiurl}/api/subscriptions/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem("token")
        },
    });
}

export {
    getSubscriptions,
    getSubscriptionById,
    create,
    update,
    deleteOne
}