const apiurl = import.meta.env.VITE_BACK_DOMAIN;

/**
 * Crea una nueva orden en la base de datos
 * 
 * @param {*} orderData - Los datos de la orden
 * @returns 
 */
async function createOrder(orderData) {
   return fetch(`${apiurl}/api/orders`, {
        method: 'POST',
        headers: {
           'Content-type': 'application/json',
            'auth-token': localStorage.getItem("token")
        },
        body: JSON.stringify(orderData)
    });
}

/**
 * Retorna las ordenes que realizó el usuario
 * 
 * @param {*} userId - El id del usuario
 * @returns 
 */
async function getUserOrders(userId) {
    return fetch(`${apiurl}/api/user/${userId}/orders`, {
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
 * Trae el detalle del pedido de un usuario
 * 
 * @param {*} orderId - El id del pedido
 * @returns 
 */
async function getUserOrderDetails(orderId) {
    return fetch(`${apiurl}/api/order/${orderId}/details`, {
        method: 'GET',
        headers: {
            'Content-Type': 'appliction/json',
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

/**
 * Permite cancelar una orden al usuario
 * 
 * @param {*} orderId - El id de la orden
 * @returns 
 */
async function cancelOrder(orderId) {
    return fetch(`${apiurl}/api/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al cancelar el pedido');
        }
    })
}

/**
 * Permite al usuario reactivar una orden
 * 
 * @param {*} orderId - EL id de la orden 
 * @returns 
 */
async function reactivateOrder(orderId) {
    return fetch(`${apiurl}/api/orders/${orderId}/reactivate`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al obtener al reactivar la orden')
        }
    })
}

export {
    createOrder,
    getUserOrders,
    getUserOrderDetails,
    cancelOrder,
    reactivateOrder,
}
