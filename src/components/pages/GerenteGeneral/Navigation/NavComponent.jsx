export default function NavComponent() {
  return (
    <div>
      <nav>
        <a href="/gerente-general" className="menu-item">
          <i className="fas fa-chart-line"></i> Dashboard
        </a>
        <div className="menu-item">
          <i className="fas fa-users"></i>&nbsp; Gestionar Personal
          <div className="submenu">
            <a
              href="/gerente-general/list/recepcionistas"
              className="submenu-item"
            >
              Recepcionistas
            </a>
            <a
              href="/gerente-general/list/div-cuartos"
              className="submenu-item"
            >
              Gerentes Div. Cuartos
            </a>
            <a
              href="/gerente-general/list/gerente-reservaciones"
              className="submenu-item"
            >
              Gerentes Reservaciones
            </a>
          </div>
        </div>
        <a href="/gestionar-reservas/list" className="menu-item">
          <i className="fas fa-calendar-check"></i> Gestionar Reservas
        </a>
        <a href="/gestionar-habitaciones" className="menu-item">
          <i className="fas fa-bed"></i> Gestionar Habitaciones
        </a>
        <a href="/recepcion" className="menu-item">
          <i className="fas fa-concierge-bell"></i> Recepción
        </a>
      </nav>
    </div>
  );
}
