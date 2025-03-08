import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { formatPrice } from "../utils/formatPrice.js";

import * as GamesService from "../services/games.services.js";

const GamesList = ({ selectedGenres = [], selectedPlataforms = [] }) => {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);

    useEffect(() => {
        GamesService.getGames()
            .then(data => {
                setGames(data);
                setFilteredGames(data);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        let filtered = games;

        if (selectedGenres.length > 0) {
            filtered = filtered.filter(game =>
                game.genres.some(genre => selectedGenres.includes(genre))
            );
        }

        if (selectedPlataforms.length > 0) {
            filtered = filtered.filter(game =>
                game.plataforms.some(plataform => selectedPlataforms.includes(plataform))
            );
        }

        setFilteredGames(filtered);
    }, [selectedGenres, selectedPlataforms, games]);

    return (
        <>
            {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                    <article key={game._id} className="col-lg-2 col-md-4 col-sm-6 col-12 mb-3">
                        <div className="card featured-game-card shadow">
                            <Link to={`/juego/${game._id}`} title={game.title} className="text-decoration-none">
                                <img src={game.cover} alt={game.cover_description} className="card-img-top img-fluid mw-100" />
                                <div className="card-body">
                                    <h3 className="card-title text-truncate">{game.title}</h3>
                                    <p className="price-final text-success text-start mb-auto">
                                        ARS {formatPrice(game.price)}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </article>
                ))
            ) : (
                <p className="fs-5 text-center text-muted">No se encontraron juegos con los filtros seleccionados.</p>
            )}
        </>
    );
};

export default GamesList;
