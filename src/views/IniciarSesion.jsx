import { useState } from "react";
import { logIn } from "../services/user.services";
import { validateLogin } from "../validators/loginValidator";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth(); 
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateLogin(email, password)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length == 0) {   
            logIn(email, password)
            .then(({ token, user }) => {
                login(user, token);
                navigate("/", {
                    state: { message: `Sesión iniciada exitosamente ¡Bienvenido ${user.email}!`, type: "success" }
                });
            })
            .catch(error => {
                console.error("Error en el login:", error);
                setErrors(error.errors);
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (    
        <div className="container mt-5 py-5">
            <div className="row">
                <div className="col bg-login d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded-start">
                </div>
                <div className="col bg-white p-5 rounded px-4 py-3 rounded-start-0 rounded-end-2 border border-secondary">
                    <h2 className="fw-bold text-center pt-1 pb-3 mb-4 border-bottom">¡Bienvenido nuevamente!</h2>  
                    <form onSubmit={handleSubmit} className="py-4" noValidate>
                        <div className="mb-4">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Ingresa el email"
                                aria-describedby="emailError"
                            />
                            {errors.email && <div id="emailError" className="invalid-feedback">{errors.email}</div> }
                        </div>

                              
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <div className="container-password flex-column">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className={`form-control password-input ${errors.password ? 'is-invalid' : ''}`} 
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Ingresa tu contraseña"
                                aria-describedby="passwordError"
                            />
                            <i onClick={togglePasswordVisibility} className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`} id="eye"></i>
                            {errors.password && <div id="passwordError" className="invalid-feedback">{errors.password}</div>}
                        </div>
    
                        <div className="d-grid mt-5">
                            <button className="btn-send-form" type="submit">Iniciar Sesión</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
