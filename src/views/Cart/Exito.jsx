import { Link } from "react-router-dom"

function Exito() {
    return (
        <section class="container my-5">
            <h2 class="fw-semibold text-success">¡Compra realizada con éxito!</h2>
            <p class="fs-5">¡Tu compra ha sido procesada exitosamente! En unos instantes te estará llegando el comprobante al mail que proporcionaste. ¡Gracias por comprar en Gamers Guild!</p>
            <Link to="/" class="btn btn-success mt-4">Volver a la tienda</Link>
        </section>
    )

}

export default Exito