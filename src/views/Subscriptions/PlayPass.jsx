import BenefitsCard from "../../components/benefits-card";
import SubscriptionCard from "../../components/subscription-card";
import Button from "../../components/button";
import useTitle from "../../hooks/useTitle";

const PlayPassInfo = () => {
  useTitle("Información acerca del Play Pass")
    return (
      <>
        <section className="play-pass-info-container">
          <div className="play-pass-info-content">
            <h2 className="play-pass-info-title">Gamers Guild</h2>
            <h3 className="play-pass-info-subtitle">Play Pass</h3>
            <p className="play-pass-info-description">
              Sé el primero en jugar a los títulos nuevos, el mismo día de su lanzamiento. Además, disfruta de cientos de juegos de alta calidad con amigos en tu consola, PC y la nube. Agregamos nuevos juegos constantemente, por lo que siempre habrá algo nuevo para disfrutar.
            </p>
            <a href="#subscriptions" className="play-pass-info-btn-join">ÚNETE AHORA</a>
            <p className="play-pass-info-terms">
              La suscripción continúa automáticamente con el precio mensual habitual, a menos que la canceles en tu cuenta. Consulta <a href="#">los términos</a>.
            </p>
          </div>
          <div className="play-pass-info-image">
          </div>
        </section>
  
        <section className="container my-5 text-center">
          <h2 className="mb-5 header-play-pass">Juega desde el día uno</h2>
          <p className="mb-4 paragraph-play-pass">Disfruta de increíbles juegos nuevos desde el mismo día de su lanzamiento, Bethesda Softworks, Activision Blizzard, estudios independientes y mucho más.</p>
          <Button href={"/juegos"}>Explora el catálogo</Button>
        </section>
  
        <section className="container-fluid play-pass-benefits">
          <div className="row justify-content-center gap-3">
            <BenefitsCard/>
          </div>
        </section>
  
        <section className="container my-5" id="subscriptions">
          <h2 className="text-center my-5 header-play-pass">Elige tu plan</h2>
          <p className="text-center paragraph-play-pass mb-5">
            Descubre tu próximo juego favorito. Ya sea que disfrutes de juegos para consola, PC o todos los dispositivos, hay un plan para ti. Cancela en cualquier momento para impedir futuros cargos.
          </p>
          <div className="subscription-cards">
            <SubscriptionCard />
          </div>
        </section>
      </>
    );
  };
  
  export default PlayPassInfo;