import { useEffect, useState } from 'react';
import FeaturedGames from "../../components/featured-games";
import * as GenresService from '../../services/genres.services.js';
import * as PlataformsService from '../../services/plataforms.services.js';
import useTitle from '../../hooks/useTitle.js';

function GameList() {
    useTitle("Lista de juegos")

    const [genres, setGenres] = useState([]);
    const [plataforms, setPlataforms] = useState([]);
    
    const [filters, setFilters] = useState({
        genres: [],
        plataforms: [],
    });

    const [tempFilters, setTempFilters] = useState({
        genres: [],
        plataforms: [],
    });

    useEffect(() => {
        GenresService.getGenres()
            .then(data => setGenres(data))
            .catch(error => console.log(error));

        PlataformsService.getPlataforms()
            .then(data => setPlataforms(data))
            .catch(error => console.log(error));
    }, []);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        setTempFilters(prev => ({
            ...prev,
            [name]: prev[name].includes(value)
                ? prev[name].filter(item => item !== value)
                : [...prev[name], value]
        }));
    };

    const applyFilters = (event) => {
        event.preventDefault();
        setFilters(tempFilters);
    };

    const clearFilters = () => {
        setTempFilters({
            genres: [],
            plataforms: [],
        });
        setFilters({
            genres: [],
            plataforms: [],
        });
    };

    return (
        <>
            <section className="game-banner-section">
                <div className="game-banner-overlay">
                    <div className="game-banner-container">
                        <h2 className="game-banner-title">Black Friday</h2>
                        <p className="game-banner-description">
                            Ahorra hasta un 50% en juegos. Las ofertas finaliza el 15/03. Encuentra tu próximo juego favorito o regala uno a tu persona favorita.
                        </p>
                    </div>
                </div>
            </section>

            <section className="container-fluid">
                <div className="navbar-expand-md row my-5 ms-2">
                    <div className="col-12 d-md-none mb-3">
                        <button
                            className="btn-send-form w-100"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#filtros"
                        >
                            <i className="bi bi-filter">
                                Refinar resultados
                            </i>
                        </button>
                    </div>

                    <aside className="col-md-3 offcanvas offcanvas-start" tabIndex="-1" id="filtros">
                        <div className="offcanvas-header">
                            <h3 className='offcanvas-title'>Filtrar resultados</h3>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="close"
                            >    
                            </button>
                        </div>

                        <div className="offcanvas-body">
                            <form onSubmit={applyFilters} className="filters-container p-3 border rounded">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4 className="mb-3 fw-semibold d-md-block d-none">Filtros</h4>
                                    {(filters.genres.length > 0 || filters.plataforms.length > 0) && (
                                        <button
                                            type="button"
                                            onClick={clearFilters}
                                            className="btn-outline-success text-success border-0 fw-semibold mb-2"
                                        >
                                            Borrar filtros
                                        </button>
                                    )}
                                </div>

                                <div className="filter-section mb-4">
                                    <h5 className="filter-title">Jugar con:</h5>
                                    {plataforms.map(plataform => (
                                        <div key={plataform.name} className="form-check">
                                            <input 
                                                type="checkbox" 
                                                className="form-check-input"
                                                id={plataform.name}
                                                name="plataforms"
                                                value={plataform.name}
                                                checked={tempFilters.plataforms.includes(plataform.name)}
                                                onChange={handleFilterChange}
                                            />
                                            <label className="form-check-label" htmlFor={plataform.name}>
                                                {plataform.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <div className="filter-section mb-4">
                                    <h5 className="filter-title">Géneros:</h5>
                                    {genres.map(genre => (
                                        <div key={genre.name} className="form-check">
                                            <input 
                                                type="checkbox" 
                                                className="form-check-input"
                                                id={genre.name}
                                                name="genres"
                                                value={genre.name}
                                                checked={tempFilters.genres.includes(genre.name)}
                                                onChange={handleFilterChange}
                                            />
                                            <label className="form-check-label" htmlFor={genre.name}>
                                                {genre.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <div className="d-grid mb-3">
                                    <button
                                        type="submit"
                                        className="btn-send-form"
                                    >
                                        Aplicar filtros
                                    </button>
                                </div>
                            </form>
                        </div>
                    </aside>

                    {/* Juegos destacados */}
                    <div className="col-md-9">
                        <div className="row justify-content-start">
                            <FeaturedGames selectedGenres={filters.genres} selectedPlataforms={filters.plataforms} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default GameList;
