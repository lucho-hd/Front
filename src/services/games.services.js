const apiurl = import.meta.env.VITE_BACK_DOMAIN;

async function getGames() {
    return fetch(`${apiurl}/api/games`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener la lista de juegos');
            }
        })
}

/**
 * Trae un juego por su id
 * 
 * @param {*} id 
 * @returns 
 */
async function getGameById(id) {
    return fetch(`${apiurl}/api/games/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener el juego');
            }
        })
}

/**
 * Trae los juegos relacionados salvo el que se pasa por parámetro
 * 
 * @param {*} currentGameId 
 * @returns 
 */
async function getRelatedGames(currentGameId) {
    try {
        const response = await fetch(`${apiurl}/api/games/${currentGameId}/related`);

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener juegos relacionados:", error);
        return [];
    }
}

/**
 * Sube la imagen del juego al servidor.
 * @param {File} image Archivo de la imagen
 * @returns {Promise<string>} Ruta de la imagen subida
 */
const uploadImage = async (formData) => {
    try {
        const response = await fetch(`${apiurl}/api/uploads/games`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Error al subir la imagen');
        }

        const data = await response.json();
        console.log('Imagen subida correctamente:', data);
    } catch (error) {
        console.error("Error al subir la imagen:", error);
    }
};


/**
 * Crea un nuevo juego en la base de datos.
 * 
 * @param {Object} gameData Datos del juego
 * @returns {Promise<Object>} Juego creado
 */
async function create(gameData) {
    const response = await fetch(`${apiurl}/api/games`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'auth-token': localStorage.getItem("token")
        },
        body: gameData,
    });

    console.log(gameData);

    if (!response.ok) {
        throw new Error(`Error al crear el juego: ${response.status} ${response.statusText}`);
    }

    return await response.json();
}

/**
 * Actualiza los datos de un juego en la base de datos
 * 
 * @param {*} gameData Datos del juego
 * @returns {Promise<Object>} Juego editado
 */
async function update(id, gameData) {
    const response = await fetch(`${apiurl}/api/games/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'auth-token': localStorage.getItem("token")
        },
        body: gameData,
    });

    console.log(gameData);

    if (!response.ok) {
        throw new Error(`Error al actualizar el juego: ${response.status} ${response.statusText}`);
    }

    return await response.json();
}

/**
 * Elimina un juego de la base de datos
 * 
 * @param {*} id 
 * @returns 
 */
async function deleteGame(id) {
    const response = await fetch(`${apiurl}/api/games/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'auth-token': localStorage.getItem("token")
        },
    });

    if (!response.ok) {
        throw new Error('Error al eliminar el juego');
    }
    return await response.json()
}


export {
    getGames,
    getGameById,
    getRelatedGames,
    create,
    uploadImage,
    update,
    deleteGame,
}