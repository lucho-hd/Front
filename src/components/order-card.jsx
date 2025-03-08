import { formatPrice } from "../utils/formatPrice"
import { formatDate }  from "../utils/formatDate"
import { Link } from "react-router-dom"

function OrderCard({ order, link }) {
    return (
        <article className="col-md-10 col-12 mb-3">
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="card-title fs-5">Número de pedido: { order._id }</h3>
                        <p className="card-text fw-semibold"><span className="text-success">Fecha</span>: {formatDate(order.date_of_purchase)}</p>
                    </div>
                    <p className="card-text text-success fw-semibold">Monto: ARS$ {formatPrice(order.total)}</p>
                    <div className="d-flex">
                        <Link 
                            to={ link } 
                            className="btn-send-form ms-auto"
                        >
                            Ver detalle
                        </Link>
                    </div>
                </div>  
            </div>
        </article>
    )
}

export default OrderCard