import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../validators/userValidator"
import { createUser } from "../../services/user.services";

function CreateUser() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateUser(formData)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length == 0) {
            const formattedData = {
                ...formData
            }
            createUser(formattedData);
            navigate('/iniciar-sesion', {
                state: { message: '¡Cuenta creada exitosamente!', type: 'success' }
            })
        }
    }

    return (
        <div className="container mt-5 pt-5 px-5">
            <div className="row">
                <div className="col bg-login d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded-start">
                    {/* Img*/}
                </div>
                <div className="col bg-white px-4 py-3 rounded-start-0 rounded-end border border-secondary pb-3">
                    <h2 className="fw-bold text-center pt-1 border-bottom pb-3 mb-4">
                        Crear una cuenta
                    </h2>
                    <form action="#" method="post" className="mt-4" onSubmit={handleSubmit} noValidate>
                        <div className="row">
                            <div className="col-md-6 col-12 mb-4">
                                <label htmlFor="name" className="form-label">Nombre</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    id="name"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ingresa tu nombre"
                                    required
                                    aria-describedby="nameError"
                                />
                                {errors.name && <div id="nameError" className="invalid-feedback">{errors.name}</div>}
                            </div>
                            <div className="col-md-6 col-12 mb-4">
                                <label htmlFor="surname" className="form-label">Apellido</label>
                                <input 
                                    type="text" 
                                    name="surname"
                                    id="surname"
                                    className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
                                    value={formData.surname}
                                    onChange={handleChange}
                                    placeholder="Ingresa tu apellido"
                                    required
                                    aria-describedby="surnameError"
                                />
                                {errors.surname && <div id="surnameError" className="invalid-feedback">{errors.surname}</div>}
                            </div>

                            <div className="col-md-6 col-12 mb-4">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    id="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Ingresa tu email"
                                    required
                                    aria-describedby="emailError"
                                />
                                {errors.email && <div id="emailError" className="invalid-feedback">{errors.email}</div>}
                            </div>

                            <div className="col-md-6 col-12 mb-4">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <div className="container-password flex-column">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        className={`form-control password-input ${errors.password ? 'is-invalid' : ''}`}
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="Ingresa tu contraseña"
                                    />
                                    <i onClick={togglePasswordVisibility} className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`} id="eye"></i>
                                    {errors.password && <div id="passwordError" className="invalid-feedback">{errors.password}</div>}
                                </div>
                            </div>

                            <div className="d-grid mb-3">
                                <button 
                                    type="submit"
                                    className="btn-send-form"
                                >
                                    Crear cuenta
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUser