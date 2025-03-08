import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
      <div className="text-center mt-5">
        <h2 className="fs-1">¡Lo sentimos!</h2>
        <p className="fw-semibold">La página que buscas no existe o ha sido eliminada.</p>
        <Link to="/">Volver a la página de inicio</Link>
      </div>
    );
  };
  
  export default PageNotFound;
  