import { useEffect }   from "react";
import { useNavigate } from "react-router-dom";
import { useAuth }     from "../../context/AuthContext";

function RouterPrivate({ children }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/iniciar-sesion", {
                state: { message: "Debes iniciar sesión para realizar esta acción", type: "warning" }
            });
        }
    }, [isAuthenticated]);
    
    return isAuthenticated ? children : null
}

export default RouterPrivate;