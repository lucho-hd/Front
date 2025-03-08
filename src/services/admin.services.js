const apiurl = import.meta.env.VITE_BACK_DOMAIN;

async function getStats() {
    return fetch(`${apiurl}/api/admin`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener las estadísticas');
            }
        })
}

/**
 * Obtiene los usuarios registrados en el sitio
 * 
 * @returns 
 */
async function getUsers() {
    return fetch(`${apiurl}/api/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener a los usuarios');
            }
        })
}

/**
 * Trae todos los pedidos asociados a un usuario
 * 
 * @param {*} userId - El id del usuario
 * @returns 
 */
async function getUserOrders(userId) {
    return fetch(`${apiurl}/api/admin/user/${userId}/orders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener los pedidos del usuario');
            }
        })
}

/**
 * Trae el detalle del pedido 
 * 
 * @param {*} orderId - El id del pedido
 * @returns 
 */
async function getUserOrderDetails(orderId) {
    return fetch(`${apiurl}/api/admin/order/${orderId}/details`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener el detalle del pedido');
            }
        })
}

export {
    getStats,
    getUsers,
    getUserOrders,
    getUserOrderDetails,
} 