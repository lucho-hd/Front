function footer() {
    return (
        <footer className="mt-5 mb-0">
            <div className="social_media ms-4">
                <h2 className="fw-normal fs-5">Síguenos</h2>
                <a href="https://www.instagram.com/" target="_blank" className="text-dark" rel="noopener">
                    <i className="bi-instagram"></i>
                </a>
                <a href="https://www.youtube.com/" target="_blank" className="text-dark" rel="noopener">
                    <i className="bi-youtube"></i>
                </a>
                <a href="https://www.tiktok.com/es/" target="_blank" className="text-dark" rel="noopener">
                    <i className="bi-tiktok"></i>
                </a>
                <a href="https://x.com/home?lang=es" target="_blank" className="text-dark" rel="noopener">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                    </svg>
                </a>
            </div>
            <div className="container-fluid bottom-footer">
                <div className="row gap-lg-5 justify-content-md-between">
                    <div className="col-lg-3 col-md-3 col-12">
                        <h2 className="fw-semibold fs-4">Gamers Guild</h2>
                        <p className="footer-text mt-3">
                            Tienda de juegos digitales para PS4, PS5 y PC con excelente
                            servicio al cliente y una gran variedad de
                            productos disponibles.
                        </p>
                    </div>
        
                    <div className="col-lg-3 col-md-4 col-12">
                        <h2 className="fw-semibold fs-4">Recursos</h2>
                        <ul className="footer-items">
                            <li>
                                <a href="#" className="footer-text">Soporte técnico</a>
                            </li>
                            <li>
                                <a href="#" className="footer-text">Comentarios</a>
                            </li>
                            <li>
                                <a href="#" className="footer-text">Estándares de la comunidad</a>
                            </li>
                        </ul>
                    </div>
        
                    <div className="col-lg-3 col-md-4 col-12">
                        <h2 className="fw-semibold fs-4">Tienda</h2>
                        <ul className="footer-items">
                            <li>
                                <a href="#" className="footer-text">Seguimiento de pedidos</a>
                            </li>
                            <li>
                                <a href="#" className="footer-text">Devoluciones</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul className="d-flex flex-sm-row flex-column justify-content-start
                        me-5 mb-0 pt-5
                        footer-items pb-0 gap-md-4 gap-2"
                > 
                    <li>
                        <a href="#" className="footer-text">Privacidad y cookies</a>
                    </li>
                    <li>
                        <a href="#" className="footer-text">Aviso legal</a>
                    </li>
                    <li>
                        <a href="#" className="footer-text">Sobre nuestra publicidad</a>
                    </li>
                    <li>
                        <a href="#" className="footer-text">Avisos de terceros</a>
                    </li>
                    <li className="footer-text copy m-sm-auto me-sm-0">
                        &copy; Gamers Guild 2025 | Todos los derechos reservados
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default footer;