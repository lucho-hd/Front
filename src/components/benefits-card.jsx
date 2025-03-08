const benefitsCardsData = [
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 14.25c-4.97 0-9 2.134-9 4.875v.375a.375.375 0 00.375.375h17.25a.375.375 0 00.375-.375v-.375c0-2.741-4.03-4.875-9-4.875z" /></svg>',
      title: 'Juegos multijugador',
      description: 'Modo multijugador online para tu consola y PC incluido en la suscripción',
      link: null,
      linkText: null,
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 28 28"><path fill="currentColor" d="M18.637 6.053a2.67 2.67 0 0 0-1.694.208q-.327.163-.67.351c-.454.25-.947.388-1.438.388h-1.674c-.49 0-.983-.137-1.438-.388q-.334-.183-.653-.342a2.72 2.72 0 0 0-1.727-.214l-1.622.311a3.03 3.03 0 0 0-2.126 1.608c-1.672 3.292-2.926 5.96-3.393 8.224c-.48 2.332-.139 4.3 1.404 6.092c.882 1.024 2.35.826 3.132-.065c.597-.68 1.277-1.466 1.956-2.258A2.76 2.76 0 0 1 10.792 19h6.413c.805 0 1.571.354 2.097.968c.691.806 1.383 1.606 1.988 2.295c.765.87 2.205 1.055 3.067.066c1.569-1.8 1.92-3.776 1.439-6.122c-.468-2.277-1.733-4.963-3.42-8.282a2.93 2.93 0 0 0-2.06-1.55zm-1.03 1.553c.209-.103.468-.134.747-.08l1.678.322c.434.084.807.364 1.007.757c1.703 3.35 2.867 5.858 3.287 7.904c.407 1.977.106 3.451-1.1 4.834c-.166.192-.54.236-.81-.07a257 257 0 0 1-1.975-2.282a4.26 4.26 0 0 0-3.236-1.491h-6.413a4.26 4.26 0 0 0-3.237 1.491a256 256 0 0 1-1.944 2.245c-.293.334-.687.287-.868.076c-1.184-1.375-1.477-2.843-1.072-4.81c.42-2.034 1.574-4.525 3.262-7.848a1.53 1.53 0 0 1 1.07-.813l1.623-.312c.29-.056.56-.024.778.085q.284.14.596.313a4.5 4.5 0 0 0 2.162.573h1.673c.771 0 1.51-.215 2.162-.573q.32-.176.61-.32M14 12.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5" /></svg>',
      title: 'Juega desde la nube',
      description: 'Disfruta de tus títulos favoritos en múltiples dispositivos con los juegos en la nube',
      link: '#',
      linkText: 'MÁS INFORMACIÓN',
    },
    {
        icon:  '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4v12.25L17.25 11l.75.66l-6.5 6.5l-6.5-6.5l.75-.66L11 16.25V4zM3 19h1v2h15v-2h1v3H3z" /></svg>',
        title: 'Descargar juegos para consola y PC',
        description: 'Descarga y juega desde tu consola o PC Windows con Ultimate',
        link:  null,
        linkText: null,   
    },
    {
        icon:  '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"     viewBox="0 0 512 512"><path fill="currentColor" d="m426.645 273.941l.022 99.392l-170.667 96l-170.667-96l-.021-97.749l42.667 24.939l.021 47.85l106.667 59.99l-.022-74.027l21.502-13.189l21.165 13.018l.021 74.198L384 348.352l-.021-49.493zM208.019 57.681l47.391 27.99l.59-.338l.263.146l44.881-26.492l179.404 104.569l-45.042 27.651l45.05 26.593l-180.519 105.42l-44.008-27.032l-45.39 27.898l-180.518-105.42l46.046-27.203l-47.552-29.212zM406.934 192l-151.039-83.072L107.892 192l148.003 83.072z" /></svg>',
        title: 'Recompensas',
        description: 'Disfruta de Recompensas gratis, como contenido en el juego, consumibles y más',
        link: '#',
        linkText: 'MÁS INFORMACIÓN',
    },
    {   
        icon:  '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m5.8 21l1.6-7L2 9.2l7.2-.6L12 2l2.8 6.6l7.2.6l-3.2 2.8H18c-.7 0-1.4.1-2.1.4l2.2-1.9l-4.4-.4l-1.7-4l-1.7 4l-4.4.4l3.3 2.9l-1 4.3l3.8-2.3l.5.3c-.2.5-.4 1.1-.4 1.6zM17 14v3h-3v2h3v3h2v-3h3v-2h-3v-3z" /></svg>',
        title:  'Nuevos Juegos',
        description:  'Se agregan constantemente juegos, incluso el mismo día de su lanzamiento',
        link:  null,
        linkText:  null,
    }
];

function BenefitsCard() {
    return (
        <section className="container-fluid play-pass-benefits">
          <div className="row justify-content-center gap-3">
            {benefitsCardsData.map((card, index) => (
              <div className="col-lg-3 col-md-5 col-auto" key={index}>
                <article className="benefits-card mb-5">
                  <div className="benefits-card-icon" dangerouslySetInnerHTML={{ __html: card.icon }} />
                  <h3 className="benefits-card-title">{card.title}</h3>
                  <p className="benefits-card-description">{card.description}</p>
                  {card.link && card.linkText && (
                    <a className="benefits-card-link" href={card.link}>
                      {card.linkText}
                    </a>
                  )}
                </article>
              </div>
            ))}
          </div>
        </section>
      );
}

export default BenefitsCard;
