export default function RecepcionComponent() {
  return (
    <>
      <div className="recepcion-container">
        <h1 className="recepcion-titulo">Panel de Recepcionista</h1>
        <div className="recepcion-panel">
          <h2>Acciones Rápidas</h2>
          <div className="recepcion-acciones">
            <button className="recepcion-btn recepcion-btn-success">
              <i className="fas fa-check-circle"></i> Nuevo Check-In
            </button>
            <button className="recepcion-btn recepcion-btn-warning">
              <i className="fas fa-sign-out-alt"></i> Realizar Check-Out
            </button>
          </div>
        </div>
        <div className="recepcion-panel">
          <h2>Huéspedes Actuales</h2>
          <div className="recepcion-panel table-container table-container-expand">
            <table className="main-content ">
              <thead>
                <tr>
                  <th>Habitación</th>
                  <th>Nombre</th>
                  <th>Fecha de Entrada</th>
                  <th>Fecha de Salida</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>101</td>
                  <td>Juan Pérez</td>
                  <td>2023-06-15</td>
                  <td>2023-06-20</td>
                  <td>
                    <button className="recepcion-btn recepcion-btn-warning">
                      <i className="fas fa-sign-out-alt"></i> Check-Out
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>101</td>
                  <td>Juan Pérez</td>
                  <td>2023-06-15</td>
                  <td>2023-06-20</td>
                  <td>
                    <button className="recepcion-btn recepcion-btn-warning">
                      <i className="fas fa-sign-out-alt"></i> Check-Out
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>101</td>
                  <td>Juan Pérez</td>
                  <td>2023-06-15</td>
                  <td>2023-06-20</td>
                  <td>
                    <button className="recepcion-btn recepcion-btn-warning">
                      <i className="fas fa-sign-out-alt"></i> Check-Out
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>101</td>
                  <td>Juan Pérez</td>
                  <td>2023-06-15</td>
                  <td>2023-06-20</td>
                  <td>
                    <button className="recepcion-btn recepcion-btn-warning">
                      <i className="fas fa-sign-out-alt"></i> Check-Out
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>101</td>
                  <td>Juan Pérez</td>
                  <td>2023-06-15</td>
                  <td>2023-06-20</td>
                  <td>
                    <button className="recepcion-btn recepcion-btn-warning">
                      <i className="fas fa-sign-out-alt"></i> Check-Out
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>205</td>
                  <td>María González</td>
                  <td>2023-06-17</td>
                  <td>2023-06-22</td>
                  <td>
                    <button className="recepcion-btn recepcion-btn-warning">
                      <i className="fas fa-sign-out-alt"></i> Check-Out
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>308</td>
                  <td>Carlos Rodríguez</td>
                  <td>2023-06-18</td>
                  <td>2023-06-25</td>
                  <td>
                    <button className="recepcion-btn recepcion-btn-warning">
                      <i className="fas fa-sign-out-alt"></i> Check-Out
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
