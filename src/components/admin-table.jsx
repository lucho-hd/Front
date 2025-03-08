import { Link, useLocation } from "react-router-dom";

function AdminTable({ title, link, textBtn, caption, columns = [], data = [], renderActions }) {
    const location = useLocation();

    const showIconRoutes = ["/admin/pedidos", "/admin/juegos", "/admin/usuarios", "/admin/suscripciones"]

    return (
        <>
            <div className="d-flex justify-content-between align-items-center my-3">
                {title && (
                        <h2>
                            {showIconRoutes.includes(location.pathname) &&  (
                                <Link to="/admin/panel">
                                    <i className="bi-arrow-left-circle text-success"></i>
                                </Link>
                            )}
                            {title}
                        </h2>
                    )}
                    {link && (
                        <Link className="btn-send-form text-decoration-none" to={link}>
                            <i className="bi-plus-circle"></i> {textBtn}
                        </Link>
                    )}
            </div>

            <div className="table-responsive bg-white p-3 overflow-auto admin border border-dark rounded mt-4">
                <table className="table caption-top table-hover table-bordered border-secondary text-center">
                    <caption className="fw-bold">{caption}</caption>
                    <thead className="text-center">
                        <tr>
                            {columns.length > 0 ? (
                                columns.map((col, index) => <th key={index}>{col.label}</th>)
                            ) : (
                                <th>No hay columnas definidas</th>
                            )}
                            {renderActions && <th>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item, rowIndex) => (
                                <tr key={rowIndex}>
                                    {columns.map((column) => (
                                        <td key={column.key} className={column.className || ""}>
                                            {column.render ? column.render(item) : item[column.key]}
                                        </td>
                                    ))}
                                    {renderActions && (
                                        <td className="d-flex flex-column gap-3">
                                            {renderActions(item)}
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 1} className="text-center">
                                    No hay datos disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AdminTable;
