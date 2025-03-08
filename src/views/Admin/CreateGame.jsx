import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { create } from "../../services/games.services";
import { getGenres } from "../../services/genres.services";
import { getPlataforms } from "../../services/plataforms.services";

import GameForm from "../../components/game-form";
import AlertMessage from "../../components/alert-message";

function CreateGame() {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    const [plataforms, setPlataforms] = useState([]);
    const [alert, setAlert] = useState({ message: '', type: '' });

    useEffect(() => {
        async function loadData() {
            try {
                const genresData = await getGenres();
                const plataformsData = await getPlataforms();
                setGenres(genresData);
                setPlataforms(plataformsData);
            } catch (error) {
                console.error("Error al obtener los géneros y plataformas:", error);
            }
        }
        loadData();
    }, []);

    const handleCreateGame = async (gameData) => {
        try {
            await create(gameData);
            navigate("/admin/juegos", {
                state: { message: "Juego creado correctamente", type: "success" },
            });
        } catch (error) {
            console.error("Error al crear el juego:", error);
            setAlert({ message: "Error al crear el juego", type: "danger" });
        }
    };
    

    return (
        <div className="container-fluid">
            <h2 className="mt-3 mb-4 pb-3 border-bottom">
                <Link to="/admin/juegos">
                    <i className="bi-arrow-left-circle me-2 text-success"></i>
                </Link>
                Crear un nuevo juego
            </h2>
            <GameForm 
                onSubmit={handleCreateGame} 
                genres={genres} 
                plataforms={plataforms} 
            />
        </div>
    );
}

export default CreateGame;
