const apiurl = import.meta.env.VITE_BACK_DOMAIN;

/**
 * Crea un nuevo usuario en la base de datos
 * 
 * @param {*} userData - Datos del usuario (nombre, apellido, email y contraseña)
 * @returns 
 */
async function createUser(userData) {
    return fetch(`${apiurl}/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    .then( async (response) => {
        if(response.ok){

            return response.json()
        } else {
            throw new Error('Error al crear el usuario');
        }
    }) 
}

/**
 * Inicia la sesión del usuario
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
async function logIn(email, password) {
    return fetch(`${apiurl}/api/users/iniciar-sesion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        if (!response.ok) {
            console.error('Error en el login:', response.statusText);
            throw new Error('Error en el login');
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Error en la solicitud de login:', error);
        throw error;
    });
}

async function getUserById(id) {
    return fetch(`${apiurl}/api/users/${id}`, {
        method: 'GET',
        headers:  {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json
            } else {
                throw new Error('Error al obtener los datos del usuario autenticado')
            }
        })
}

export {
    createUser,
    logIn,
    getUserById
}