/**
 * Componente para mostrar una tarjeta con icono, título y valor.
 * 
 * @param {string} icon - El nombre del icono (ejemplo: "bi-house").
 * @param {string} color - El color del icono (ejemplo: "text-primary").
 * @param {string} title - El título de la tarjeta.
 * @param {string} value - El valor que se muestra en la tarjeta.
 */
function DashboardCard({ icon, color, title, value }) {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex align-items-center">
        <div className="icon me-3">
          <i className={`${icon} fs-1 ${color}`}></i>
        </div>
        <div>
          <h4 className="card-title fs-4">{title}</h4>
          <p className="card-text mb-0 fw-bold fs-5">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
