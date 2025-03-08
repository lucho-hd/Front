import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getGameById, update } from "../../services/games.services";

import { getGenres } from "../../services/genres.services";
import { getPlataforms } from "../../services/plataforms.services";

// Componentes
import GameForm from "../../components/game-form";
import AlertMessage from "../../components/alert-message";

function  EditGame () {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [genres, setGenres] = useState([]);
    const [plataforms, setPlataforms] = useState([]);
    const [alert, setAlert] = useState({ message: '', type: '' });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const gameData = await getGameById(id);
                const genresData = await getGenres();
                const plataformsData = await getPlataforms();
                setGame({
                    ...gameData,
                });
                setGenres(genresData);
                setPlataforms(plataformsData);
            } catch (error) {
                console.error("Error al obtener el juego:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGame();
    }, [id]);
    
    
    const handleUpdateGame = async (updatedGameData) => {
        try {
            await update(id, updatedGameData);
            navigate("/admin/juegos", {
                state: { message: "Juego actualizado correctamente", type: "success" },
            });
        } catch (error) {
            console.error("Error al actualizar el juego:", error);
            setAlert({ message: "Error al actualizar el juego", type: "danger" });
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="container-fluid">
            {alert.message && <AlertMessage message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />}
                
            <h2 className="my-3">
                <Link to="/admin/juegos" className="text-success me-2">
                    <i className="bi-arrow-left-circle"></i>
                </Link>
                Editar {game.title}
            </h2>
            {game && 
                <GameForm 
                    initialData={game} 
                    genres={genres}
                    plataforms={plataforms}
                    onSubmit={handleUpdateGame} 
                />}
        </div>
    );
};

export default EditGame;
