const slides = [
    {
      desktop_image: '/img/carousel/senua_desktop.webp',
      tablet_image: '/img/carousel/senua_tablet.jpg',
      mobile_image: '/img/carousel/senua_mobile.jpg',
      title: 'Senua\'s Saga: Hellblade II',
      description: 'Senua vuelve en una brutal saga de supervivencia',
      button_text: 'Consíguelo ahora',
      button_link: '#',
    },
    {
      desktop_image: '/img/carousel/jedi_survivor_desktop.webp',
      tablet_image: '/img/carousel/jedi_survivor_tablet.jpg',
      mobile_image: '',
      title: 'STAR WARS Jedi: Survivor',
      description: 'Enfréntate a la oscuridad',
      button_text: 'Consíguelo ahora',
      button_link: '#',
    },
    {
      desktop_image: '/img/carousel/star_wars_outlaws_desktop.webp',
      tablet_image: '/img/carousel/star_wars_outlaw_tablet.jpg',
      mobile_image: '',
      title: 'STAR WARS Outlaws',
      description: 'La galaxia está repleta de oportunidades',
      button_text: 'Consíguelo ahora', 
      button_link: '#',
    },
  ];

  import useTitle from "../hooks/useTitle";

  // Componentes
  import Carousel      from "../components/carousel";
  import Button        from "../components/button";
  import FeaturedGames from "../components/featured-games";

function Inicio() {
  useTitle("Inicio")
    return (
        <>
            <Carousel slides={slides} />
            <section className="featured_games text-center my-5">
                <div className="my-5">
                    <h2 className="text-center border-0 my-5">Descubre tu siguiente juego favorito</h2>
                    <p>Explora cientos de juegos de alta calidad para consola de todos los géneros, con juegos que se agregar continuamente. Ahora también en PC.</p> 
                    <Button href={"/juegos"}>
                      Explorar juegos
                    </Button>
                </div>

                <div className="container-fluid">
                  <div className="row justify-content-center pt-3 pb-5">
                    <FeaturedGames />
                  </div>
                </div>
            </section>

            <section className="play-pass-banner my-5">
              <div className="play-pass-container">
                <img  className="play-pass-banner-image" src="./img/banners/play_pass.jpg" alt="" />
              </div>
              <div className="play-pass-banner-content">
                <h3>Play Pass</h3>
                <p>Disfrutá de cientos de juegos en consola y en PC.</p>
                <Button href={"/playpass"}>
                  Únete ahora
                </Button>
              </div>
            </section>
        </>
    )
}

export default Inicio