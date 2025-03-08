import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext.jsx"
import { formatPrice } from "../../utils/formatPrice.js"
import { formatDate } from "../../utils/formatDate.js"

import * as AdminService from "../../services/admin.services.js"
import DashboardCard from "../../components/dashboard-card"
import AdminTable from "../../components/admin-table.jsx"
import useTitle from "../../hooks/useTitle.js"
import Loader from "../../components/loader.jsx"  

function AdminDashboard() {
    useTitle("Panel de Administración")

    const { user } = useAuth();
    const [stats, setStats] = useState({
        gameCount: 0,
        genreCount: 0,
        plataformCount: 0,
        subscriptionCount: 0,
        userCount: 0,
        orderCount: 0,
        lastGame: "No se ha creado ningún juego",
        lastGenre: "No se ha creado ningún género",
        lastPlataform: "No se ha creado ninguna plataforma",
        lastOrders: [],
        totalAmount: 0,
        mostSoldProduct: null,
    });
    
    // Estado para controlar la carga
    const [loading, setLoading] = useState(true);

    const columns = [
        { 
            key: "_id", 
            label: "N° de pedido", 
            className: "table-item" 
        },
        { 
            key: "product_name", 
            label: "Productos", 
            className: "table-item" 
        },
        { 
            key: 'total', 
            label: "Total", 
            className: "table-item",
            render: (lastOrders) => (formatPrice(lastOrders.total))
        },
        { 
            key: "date_of_purchase", 
            label: "Fecha", 
            className: "table-item", 
            render: (lastOrders) => (formatDate(lastOrders.date_of_purchase))
        },
        {
            key: "state",
            label: "Estado",
        },
    ];

    useEffect(() => {
        AdminService.getStats()
            .then(data => {
                setStats(data);
                setLoading(false); 
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <section className="container-fluid">
            {loading ? (
                <Loader
                    message={"Cargando panel..."}
                 />
            ) : (
                <>
                    <div className="bg-white px-3 py-4 my-3 border rounded">
                        <h2 className="fw-semibold mb-3">Bienvenido al panel de administración del sitio</h2>
                        <p className="mb-0">Hola, <b>{user && user.name && user.surname ? `${user.name} ${user.surname}` : "Mi Perfil"}</b>. En este panel podrás ver las últimas acciones que se llevaron acabo en el sitio.</p>
                    </div>

                    <h3 className="my-4 border-bottom pb-2 fs-3 fw-bold">Datos principales del sitio</h3>

                    <div className="row">
                        <article className="col-lg-4 col-md-6 col-12 col-auto mb-2">
                            <DashboardCard 
                                icon="bi-people"
                                color="text-white"
                                title="Usuarios registrados"  
                                value={stats.userCount}
                            />
                        </article>

                        <article className="col-lg-4 col-md-6 col-12 col-auto mb-2">
                            <DashboardCard 
                                icon="bi-controller"
                                color="text-white"
                                title="Juegos registrados"  
                                value={stats.gameCount}
                            />
                        </article>

                        <article className="col-lg-4 col-md-6 col-12 col-auto mb-2">
                            <DashboardCard 
                                icon="bi-bag-check"
                                color="text-white"
                                title="Pedidos realizados"  
                                value={stats.orderCount}
                            />
                        </article>

                        <article className="col-lg-4 col-md-6 col-12 col-auto mb-2">
                            <DashboardCard 
                                icon="bi-cash"
                                color="text-white"
                                title="Suscripciones"  
                                value={stats.subscriptionCount}
                            />
                        </article>
                    </div>

                    <div className="d-flex justify-content-between align-items-center border-bottom mt-5 mb-4 pb-2">
                        <h3 className="fw-bold fs-3">Información de los juegos</h3>
                        <Link  className="text-success fw-semibold" to="/admin/juegos">
                            <i className="bi-plus-circle"></i>
                            Ver más información
                        </Link>
                    </div>

                    <div className="row">
                        <article className="col-lg-4 col-md-6 col-12 mb-2">
                            <DashboardCard 
                                icon="bi-controller"
                                color="text-white"
                                title="Último juego"
                                value={stats.lastGame}
                            />
                        </article>

                        <article className="col-lg-4 col-md-6 col-12 mb-2">
                            <DashboardCard 
                                icon="bi-collection"
                                color="text-white"
                                title="Plataformas registradas"
                                value={stats.plataformCount}
                            />
                        </article>

                        <article className="col-lg-4 col-md-6 col-12 mb-2">
                            <DashboardCard 
                                icon="bi-file-plus"
                                color="text-white"
                                title="Géneros registrados"
                                value={stats.genreCount}
                            />
                        </article>

                        <article className="col-lg-4 col-md-6 col-12 mb-2">
                            <DashboardCard 
                                    icon="bi-file-plus"
                                    color="text-white"
                                    title="Último género registrado"
                                    value={stats.lastGenre}
                                />
                        </article>

                        <article className="col-lg-5 col-md-6 col-12 mb-2">
                            <DashboardCard 
                                icon="bi-collection"
                                color="text-white"
                                title="Última plataforma registrada"
                                value={stats.lastPlataform}
                            />
                        </article>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-5 mb-4 pb-2 border-bottom">
                        <h3 className="fw-bold">Información acerca de los pedidos</h3>
                        <Link className="text-success fw-semibold" to="/admin/usuarios">
                            <i className="bi-plus-circle"></i>
                            Ver más pedidos
                        </Link>
                    </div>

                    <div className="row">
                        <article className="col-lg-5 col-md-6 col-12 mb-2">
                            <DashboardCard
                                icon="bi-bar-chart"
                                color="text-white"
                                title="Producto más vendido"
                                value={stats.mostSoldProduct}
                            />
                        </article>

                        <article className="col-lg-4 col-md-6 col-12 mb-2">
                            <DashboardCard
                                icon="bi-cash-stack"
                                color="text-white"
                                title="Total recaudado"
                                value={formatPrice(stats.totalAmount)}
                            />
                        </article>
                    </div>

                    <div className="mb-4">
                        <AdminTable 
                            caption="Últimos pedidos realizados"
                            columns={columns}
                            data={stats.lastOrders}
                            renderActions={(lastOrders) => (
                                <>
                                    <Link className="text-success fw-semibold text-decoration-none" to={`/admin/pedido/${lastOrders._id}/detalle`}>
                                        Ver detalle
                                    </Link>
                                </>
                            )}
                        />
                    </div>
                </>
            )}
        </section>
    )
}

export default AdminDashboard;
