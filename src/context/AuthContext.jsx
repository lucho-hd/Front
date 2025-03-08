import { createContext, useState, useEffect, useContext } from "react";
import { getUserById } from "../services/user.services";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [message, setMessage] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else if (token) {
        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const decoded = JSON.parse(window.atob(base64));

          if (decoded._id && /^[a-f\d]{24}$/i.test(decoded._id)) {
            const userData = await getUserById(decoded._id);

            if (userData) {
              const { _id, name, surname, role } = userData;
              setUser({ _id, name, surname, role });
              setIsAuthenticated(true);

              localStorage.setItem("user", JSON.stringify({ _id, name, surname, role }));
            } else {
              logout();
            }
          } else {
            logout(); 
          }
        } catch (error) {
          console.error("Error al verificar el token:", error);
          logout(); 
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    fetchUserData();
  }, []); 

  const login = (userData, token) => {
    const { _id, name, surname, role } = userData;
    setUser({ _id, name, surname, role });
    setIsAuthenticated(true);
    navigate("/", {
      state: { message: `¡Bienvenido ${userData.name} ${userData.surname}!`, type: "success" }
    });

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify({ _id, name, surname, role }));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    navigate("/", {
      state: { message: "¡Cerraste sesión exitosamente!", type: "success" }
    });
    
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
