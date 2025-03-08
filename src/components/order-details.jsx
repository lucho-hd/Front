import { formatPrice } from "../utils/formatPrice";
import { formatDate }  from "../utils/formatDate";

function OrderDetails({ order }) {

    const renderOrderState = (state) => {
        switch (state) {
            case 'Aprobado':
                return <span className="text-success fw-semibold">{state}</span>;
            case 'Pendiente':
                return <span className="text-warning fw-semibold">{state}</span>;
            case 'Cancelado':
                return <span className="text-danger fw-semibold">{state}</span>;
            default:
                return <span>{state}</span>;
        }
    };

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="mb-4 border-bottom d-flex justify-content-between align-items-center">
                        <h3 className="card-title mb-2">Pedido: {order._id}</h3>
                        <p className="mb-2">
                            Fecha: <span className="fw-semibold">{formatDate(order.date_of_purchase)}</span>
                        </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                        <p className="fw-bold">
                            Producto: <span className="fw-normal">{order.product_name}</span>
                        </p>
                        <span className="mb-3">
                            Monto: <span className="fw-semibold">{formatPrice(order.total)}</span>
                        </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                        <span className="fw-bold">Método de pago:</span>
                        <span className="fw-semibold">{order.payment_method}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                        <span className="fw-bold">Estado: </span>
                        {renderOrderState(order.state)}
                    </div>
                </div>
            </div>

            <div className="card mt-4">
                <div className="card-body">
                    <h3 className="my-3 pb-3 border-bottom">Facturación</h3>
                    <span className="fw-semibold">Consumidor Final - Factura B</span>
                    <p className="fw-semibold my-3">
                        {order.user.name} {order.user.surname} {order.user.email}
                    </p>
                    <p className="my-2 fw-semibold">No se ha generado una factura para este pedido.</p>
                </div>
            </div>
        </>
    );
}

export default OrderDetails