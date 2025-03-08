const Carousel = ({ slides }) => {
  return (
    <section id="carousel" className="carousel slide" data-bs-ride="carousel">
      {/* Indicadores */}
      <ol className="carousel-indicators">
        {slides.map((slide, index) => (
          <li
            key={index}
            data-bs-target="#carousel"
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-label={`Slide ${index + 1}`}
          ></li>
        ))}
      </ol>

      {/* Contenido del carrusel */}
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
            data-bs-interval="5000"
          >
            <div className="position-relative">
              <picture>
                <source srcSet={slide.tablet_image} media="(max-width: 1050px)" />
                <source srcSet={slide.mobile_image} media="(max-width: 700px)" />
                <img src={slide.desktop_image} className="d-block w-100" alt="" />
              </picture>
              <div className="carousel-caption">
                <h2 className="border-0">{slide.title}</h2>
                <p>{slide.description}</p>
                <a href={slide.button_link} className="carousel-button flex-start">
                  {slide.button_text}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de navegación */}
      <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </section>
  );
};

export default Carousel;
