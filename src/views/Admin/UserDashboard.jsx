// Servicios
import { getUsers } from "../../services/admin.services.js";

// Hook
import useTitle from "../../hooks/useTitle.js";

// React
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// Componentes
import AdminTable from "../../components/admin-table";

function UsersDashboard() {
    const location = useLocation();

    useTitle("Lista de usuarios")

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then(setUsers)
            .catch(error => console.error("Error al obtener la lista de usuarios: ", error))

            if (location.state) {
                window.history.replaceState({}, document.title);
            }
    }, [location.state]);

    const columns = [
        {
            key: "_id",
            label: "#",
        },
        {
            key: "name",
            label: "Nombre",
            className: "table-item"
        },
        {
            key: "surname",
            label: "Apellido",
            className: "table-item"
        },
        {
            key: "email",
            label: "Email",
        }
    ]

    return (
        <AdminTable
            title="Lista de usuarios"
            caption="Listado de usuarios registrados en el sitio"
            columns={columns}
            data={users}
            renderActions={(user) => (
                <Link className="btn-send-form text-decoration-none mb-sm-1" to={`/admin/usuario/${user._id}/pedidos`}>
                    Ver pedidos
                </Link>
            )}
        />
    )
}

export default UsersDashboard