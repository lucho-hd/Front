import { useState, useEffect } from "react";
import ImagePreview from "./image-preview";
import { validateGame } from "../validators/gameValidator";

const GameForm = ({ onSubmit, initialData = {}, genres = [], plataforms = [] }) => {
    const [game, setGame] = useState({
        title: initialData.title || "",
        price: initialData.price || "",
        release_date: initialData.release_date || "",
        cover: initialData.cover || null,
        cover_description: initialData.cover_description || "",
        description: initialData.description || "",
        company: initialData.company || "",
        genres: initialData.genres || [],
        plataforms: initialData.plataforms || [] 
    });

    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(game.cover || null);

    useEffect(() => {
        if (initialData.cover) {
            setImagePreview(initialData.cover);
        }
    }, [initialData.cover]);
    
    const handleChange = (event) => {
        setGame({
            ...game,
            [event.target.name]: event.target.value
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const objectURL = URL.createObjectURL(file);
            setImagePreview(objectURL);
            setGame((prevGame) => ({ ...prevGame, cover: file }));
        }
    };

    const handleCheckboxChange = (e, type) => {
        const { value, checked } = e.target;

        if (type === "genres") {
            const genreName = genres.find((g) => g._id === value)?.name;
            setGame((prev) => ({
                ...prev,
                genres: checked
                    ? [...prev.genres, genreName]
                    : prev.genres.filter((g) => g !== genreName),
            }));
        }

        if (type === "plataforms") {
            const plataformName = plataforms.find((p) => p._id === value)?.name;
            setGame((prev) => ({
                ...prev,
                plataforms: checked
                    ? [...prev.plataforms, plataformName]
                    : prev.plataforms.filter((p) => p !== plataformName),
            }));
        }
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validateGame(game)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length == 0) {
            const formData = new FormData();
            formData.append('title', game.title);
            formData.append('price', game.price);
            formData.append('release_date', game.release_date);
            formData.append('description', game.description);
            formData.append('company', game.company);
            formData.append('cover_description', game.cover_description);
    
            game.genres.forEach(genre => formData.append('genres[]', genre));
            game.plataforms.forEach(plataform => formData.append('plataforms[]', plataform));
    
            if (game.cover) {
                formData.append('cover', game.cover);
            }

            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }
    
            onSubmit(formData);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="row" encType="multipart/form-data" noValidate>
            {/* Título */}
            <div className="col-md-6 col-12 mb-4">
                <label className="form-label required" htmlFor="title">Título</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={game.title}
                    onChange={handleChange}
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    required
                    placeholder="Ingresa el título"
                    aria-describedby="titleError" 
                />
                {errors.title && 
                    <div id="titleError" className="invalid-feedback">{errors.title}</div>
                }
            </div>

            {/* Fecha de lanzamiento */}
            <div className="col-md-6 col-12 mb-4">
                <label className="form-label required" htmlFor="release_date">Fecha de lanzamiento</label>
                <input
                    type="date"
                    id="release_date"
                    name="release_date"
                    value={game.release_date}
                    onChange={handleChange}
                    className={`form-control ${errors.release_date ? 'is-invalid' :  ''}`}
                    required
                    aria-describedby="releaseDateError" 
                />
                {errors.release_date && 
                    <div id="releaseDateError" className="invalid-feedback">{errors.release_date}</div>
                }
            </div>

            {/* Descripción */}
            <div className="col-12 mb-4">
                <label className="form-label required" htmlFor="description">Descripción</label>
                <textarea
                    name="description"
                    id="description"
                    value={game.description}
                    onChange={handleChange}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    rows="5"
                    required
                    placeholder="Ingresa la descripción"
                    aria-describedby="descriptionError" 
                ></textarea>
                {errors.description && 
                    <div id="descriptionError" className="invalid-feedback">{errors.description}</div>
                }
            </div>

            {/* Compañía */}
            <div className="col-md-6 col-12 mb-4">
                <label className="form-label required" htmlFor="company">Compañía</label>
                <input
                    type="text"
                    className={`form-control ${errors.company ? 'is-invalid' : ''}`}
                    id="company"
                    name="company"
                    value={game.company}
                    onChange={handleChange}
                    required
                    placeholder="Ingresa la compañía"
                    aria-describedby="companyError"   
                />
                {errors.company && 
                    <div id="companyError" className="invalid-feedback">{errors.company}</div>
                }
            </div>

            {/* Precio */}
            <div className="col-md-6 col-12 mb-4">
                <label className="form-label required" htmlFor="price">Precio</label>
                <input
                    type="number"
                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                    id="price"
                    name="price"
                    value={game.price}
                    onChange={handleChange}
                    required
                    placeholder="Ingresa el precio"
                    aria-describedby="priceError" 
                />
                 {errors.price && 
                    <div id="priceError" className="invalid-feedback">{errors.price}</div>
                }
            </div>

            {/* Géneros */}
            <div className="mb-3 border rounded p-3">
                <legend className="required">Géneros</legend>
                <div className="checkbox-inline mb-4 mt-3">
                    {genres.map((genre) => (
                        <div className="form-check form-check-inline" key={genre._id}>
                            <label className="mx-2">
                                <input
                                    type="checkbox"
                                    name="genre_id[]"
                                    value={genre._id}
                                    className={`form-check-input ${errors.genres ? 'is-invalid' : ''}`}
                                    checked={game.genres.includes(genre.name)}
                                    onChange={(e) => handleCheckboxChange(e, "genres")}
                                    aria-describedby="genresError" 
                                />
                                {genre.name}
                            </label>
                        </div>
                    ))}
                    {errors.genres && 
                        <div id="genresError" className="invalid-feedback">{errors.genres}</div>
                    }
                </div>
            </div>

            {/* Plataformas */}
            <div className="mb-3 border rounded p-3">
                <legend className="required">Plataformas</legend>
                <div className="checkbox-inline mb-4 mt-3">
                    {plataforms.map((plataform) => (
                        <div className="form-check form-check-inline" key={plataform._id}>
                            <label className="mx-2">
                                <input
                                    type="checkbox"
                                    name="plataform_id[]"
                                    value={plataform._id}
                                    className={`form-check-input ${errors.plataforms ? 'is-invalid' : ''}`}
                                    checked={game.plataforms.includes(plataform.name)}
                                    onChange={(e) => handleCheckboxChange(e, "plataforms")}
                                />
                                {plataform.name}
                            </label>
                        </div>
                    ))}
                    {errors.plataforms && 
                        <div id="plataformsError" className="invalid-feedback">{errors.plataforms}</div>
                    }
                </div>
            </div>

            {/* Vista previa de imagen */}
            <div className="my-3">
                <p className="fw-semibold fs-5">Portada Actual: </p>
                <ImagePreview image={imagePreview} className="w-25 rounded" />
            </div>

            {/* Imagen de portada */}
            <div className="col-md-6 col-12 mb-4">
                <label className="form-label" htmlFor="image">Selecciona una portada</label>
                <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleImageChange}
                    className="form-control"
                />
            </div>

            {/* Descripción de portada */}
            <div className="col-md-6 col-12 mb-4">
                <label htmlFor="cover_description" className="form-label required">Descripción de la portada</label>
                <input
                    type="text"
                    name="cover_description"
                    id="cover_description"
                    onChange={handleChange}
                    value={game.cover_description}
                    className={`form-control ${errors.cover_description ? 'is-invalid' : ''}`}
                    required
                    placeholder="Ingresa la descripción de la portada"
                />
                {errors.cover_description && 
                    <div id="cover_descriptionError" className="invalid-feedback">{errors.cover_description}</div>
                }
            </div>

            {/* Botón */}
            <div className="d-grid my-3">
                <button type="submit" className="btn-send-form">
                    {initialData.title ? "Actualizar" : "Crear"} Juego
                </button>
            </div>
        </form>
    );
};

export default GameForm;
