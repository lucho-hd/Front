import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import * as GamesService from "../../services/games.services.js";

// Hooks
import useTitle from "../../hooks/useTitle"

// Utils
import { formatPrice } from "../../utils/formatPrice.js";
import { formatDate } from "../../utils/formatDate.js";

// Componentes
import AdminTable from "../../components/admin-table"
import AlertMessage from "../../components/alert-message";
import DeleteModal from "../../components/delete-modal.jsx";

function GamesDashboard() {    
    const location = useLocation();
    const [alert, setAlert] = useState(location.state || { message: '', type: '' });

    useTitle("Administrar juegos")

    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        GamesService.getGames()
            .then(setGames)
            .catch(error => console.error("Error al obtener los juegos", error));

        if (location.state) {
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handleDeleteClick = (game) => {
        if (game) {
            setSelectedGame(game);
            setShowModal(true);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await GamesService.deleteGame(selectedGame._id);
            setGames(prevGames => prevGames.filter(game => game._id !== selectedGame._id));
            setAlert({ message: "Juego eliminado correctamente", type: "success" });
        } catch (error) {
            setAlert({ message: "Error al eliminar el juego", type: "danger" });
        } finally {
            setShowModal(false);
            setSelectedGame(null)
        }
    };
    
    const handleCancelDelete = () => {
        setShowModal(false);
        setSelectedGame(null);
    };

    const columns = [
        { key: "_id", label: "#", className: "table-item" },
        { key: "title", label: "Título", className: "table-item" },
        { 
            key: 'price', 
            label: "Precio", 
            className: "table-item",
            render: (game) => formatPrice(game.price) 
        },
        { key: "description", label: "Descripción", className: "table-descripcion table-item"},
        { key: "company", label: "Compañía", className: "table-item" },
        { 
            key: "release_date", 
            label: "Fecha de lanzamiento",
            className: "table-item",
            render: (game) => formatDate(game.release_date)
        },
        {
            key: "plataforms",
            label: "Plataformas",
            className: "table-badge",
            render: (game) => 
                <div>
                  {game.plataforms.map((plataform) => (
                        <span key={plataform._id} className="badge bg-secondary text-white mx-1">
                            {plataform}
                        </span>
                    ))}
                </div>
        },
        {
            key: "genres",
            label: "Géneros",
            className: "table-badge",
            render: (game) => 
                <div>
             {game.genres.map((genre) => (
                    <span key={genre._id} className="badge bg-secondary text-white mx-1">
                        {genre}
                    </span>
                ))}
                </div>
        },
    ];

    return (
        <div>
            {alert.message && <AlertMessage message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />}
            <AdminTable 
                title="Administrar Juegos"
                link="/admin/juegos/crear"
                textBtn="Crear nuevo juego"
                caption="Lista de juegos disponibles en el sitio"
                columns={columns}
                data={games}
                renderActions={(game) => (
                    <>
                        <Link className="btn btn-primary mb-sm-1" to={`/admin/juegos/editar/${game._id}`}>
                            Editar
                        </Link>
                        <button 
                            className="btn btn-danger mb-sm-1"
                            onClick={() => handleDeleteClick(game)}
                            >
                            Eliminar
                        </button>
                    </>
                )}
                />

                <DeleteModal 
                    title={`¿Eliminar juego ${selectedGame?.title}?`}
                    message ={`¿Estás seguro de que deseas eliminar el juego ${selectedGame?.title}? Esta acción es irreversible`}
                    show={showModal}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
        </div>
    )
}

export default GamesDashboard