import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { decodeJWT }  from "../../utils/decodeJWT.js";

function RouterAdminPrivate({ children }) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded?.role !== "admin") {
        navigate("/", {
          state: { message: "No tienes los permisos necesarios para realizar esta acción", type: "warning" }
        });
      } else {
        setLoading(false);
      }
    } else {
      navigate("/iniciar-sesion", {
        state: { message: "Debes iniciar sesión para realizar esta acción ", type: "warning" }
      });
    }
  }, [isAuthenticated, user?.role, navigate]);

  if (loading) {
    return null;
  }

  return children;
}

export default RouterAdminPrivate;
