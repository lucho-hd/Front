import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice.js";
import { formatDate } from "../../utils/formatDate.js";

import * as GamesService from "../../services/games.services.js";
import useTitle from "../../hooks/useTitle.js";

function GameDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [relatedGames, setRelatedGames] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        GamesService.getGameById(id)
            .then(setGame)
            .catch(console.error);

        GamesService.getRelatedGames(id)
            .then(setRelatedGames)
            .catch(console.error);
    }, [id]);

    const toggleDescription = () => {
        setIsExpanded((prevState) => !prevState);
      };

    useTitle(game ? `${game.title}` : "Gamers Guild - Cargando...");

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProduct  = cart.find(item => item.id === game._id);

        if (existingProduct ) {
            existingProduct .quantity +=1;
        } else {
            const newProduct = {
                id: game._id,
                title: game.title,
                price: game.price,
                cover: game.cover,
                quantity: 1
            };
            cart.push(newProduct);
        }
        localStorage.setItem("cart", JSON.stringify(cart));

        navigate("/carrito", {
            state: { message: "¡Producto agregado al carrito!", type: "success" }
        });
        window.location.reload();
    };

    return (
        <section className="container-fluid mb-5">
            {game && (               
                <article className="mb-3">
                    <div 
                        className="game-info-container" 
                        style={{ backgroundImage: `url(${game.cover})` }}
                    >
                        <div className="overlay"></div>
                        <div className="d-flex">
                            <div className="d-flex mb-3">
                                <img src={game.cover} alt={game.title} className="img-detalle" />
                                <div className="flex-column ms-3">
                                    <h2>{game.title}</h2>
                                    <div className="d-flex flex-md-row flex-wrap gap-3 my-4">
                                        <span className="text-white fs-5 fw-semibold">{game.company}</span>
                                        {game.genres.map((genre, index) => (
                                            <span key={index} className="text-white fs-5 fw-semibold">• {genre}</span>
                                        ))}
                                    </div>
                                    <div className="d-flex flex-md-row flex-column fw-semibold badges-caracteristicas mt-3 gap-3">
                                        <span><i className="bi-playstation"></i> Optimizado para PS4 | PS5</span>
                                        <span><i className="bi-cloud-arrow-down"></i> Smart Delivery</span>
                                        <span><i className="bi-globe"></i> Cantidad de idiomas admitidos</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column flex-md-row">
                            <span className="btn-comprar text-center">ARS {formatPrice(game.price)}</span>
                            <button 
                                className="btn-agregar-carrito w-auto"
                                onClick={addToCart}
                            >
                                <i className="bi-cart-fill"></i> Agregar al carrito
                            </button>
                        </div>
                    </div>
                </article>
            )}
    
            {game && (
                <div className="row ms-2">
                    <div className="col-md-6 col-12">
                        <h3 className="fs-4 fw-semibold my-4">Descripción</h3>
                        <div
                            id="gameDescription"
                            className={`game-description ${isExpanded ? "expanded" : ""}`}
                        >
                            <p>{game.description}</p>
                        </div>
                        <button
                            id="viewMoreBtn"
                            onClick={toggleDescription}
                            className="view-more-btn"
                        >
                            <span id="viewMoreText">
                            {isExpanded ? "Mostrar menos" : "Mostrar más"}
                            </span>
                            <i
                                id="arrow"
                                className={`bi ${isExpanded ? "bi-caret-up-fill" : "bi-caret-down-fill"}`}
                            ></i>
                        </button>

                        <div className="d-flex flex-sm-row flex-column justify-content-between">
                            <div className="mt-3">
                                <h4 className="fs-5">Publicado por</h4>
                                {game.company}
                            </div>
                            <div className="mt-3">
                                <h4 className="fs-5">Desarrollado por</h4>
                                {game.company}
                            </div>
                            <div className="mt-3">
                                <h4 className="fs-5">Fecha de publicación</h4>
                                <span>{formatDate(game.release_date)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <h3 className="fs-4 mb-4 mt-4">Se puede jugar en</h3>
                        {game.plataforms.map((platform, index) => (
                            <span key={index} className="badge-juegos">
                                <i className={platform === "PC" ? "bi-pc-display" : "bi-playstation"}></i> {platform}
                            </span>
                        ))}
                        <h3 className="fs-4 mb-4 mt-5">Géneros</h3>
                        {game.genres.map((genre, index) => (
                            <span key={index} className="badge-juegos">{genre}</span>
                        ))}
                    </div>
                </div>
            )}
    
            <section className="suggestions py-4 px-3">
                <article className="container-fluid">
                    <div className="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center mb-3">
                        <h3 className="text-white">A los usuarios también les gusta esto</h3>
                        <Link to="/juegos" className="text-white show-more-link">Mostrar todo</Link>
                    </div>
                    {relatedGames && (
                        <div className="overflow-x-auto">
                            <div className="d-flex gap-4">
                                {relatedGames.map((relatedGame) => (
                                    <div key={relatedGame._id} className="card game-card mb-3">
                                        <Link to={`/juego/${relatedGame._id}`} className="text-decoration-none text-white w-0" title={relatedGame.title}>
                                            <img src={relatedGame.cover} alt={relatedGame.title} className="game-cover" />
                                            <div className="card-body d-flex flex-column">
                                                <h4 className="game-card-title text-truncate">{relatedGame.title}</h4>
                                                <p className="price-final mb-auto">ARS$ {formatPrice(relatedGame.price)}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </article>
            </section>
        </section>
    );
}

export default GameDetails;
