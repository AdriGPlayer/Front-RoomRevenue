import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReservaService from "../../../../services/ReservaService";
import ClienteService from "../../../../services/ClienteService";

export default function HuespedesComponent() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    async function fetchReservas() {
      try {
        const response = await ReservaService.getReservasConfirmadas();
        const reservasData = response.data;

        // Filtrar manualmente las confirmadas (si el backend no lo hace bien)
        const confirmadas = reservasData.filter(
          (reserva) => reserva.estatus === "CONFIRMADA"
        );

        // Obtener los datos de los clientes
        const reservasConClientes = await Promise.all(
          confirmadas.map(async (reserva) => {
            try {
              const clienteResponse = await ClienteService.getById(
                reserva.idCliente
              );
              return { ...reserva, cliente: clienteResponse.data };
            } catch (error) {
              console.error("Error obteniendo cliente:", error);
              return {
                ...reserva,
                cliente: { name: "Desconocido", lastname: "" },
              };
            }
          })
        );

        setReservas(reservasConClientes);
      } catch (error) {
        console.error("Error obteniendo reservas:", error);
      }
    }

    fetchReservas();
  }, []);
  const checkOut = async (idReserva) => {
    try {
      await ReservaService.checkOut(idReserva);

      // Filtrar las reservas para eliminar la que ha hecho check-out
      setReservas((prevReservas) =>
        prevReservas.filter((reserva) => reserva.id !== idReserva)
      );
    } catch (error) {
      console.error("Error al hacer check-out:", error);
      alert("Hubo un error al realizar el check-out");
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100vw", opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.5,
        }}
      >
        <div className="recepcion-panel">
          <h2>Huéspedes Actuales</h2>
          <div className="recepcion-panel table-container table-container-expand">
            <table className="main-content">
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
                {reservas.length > 0 ? (
                  reservas.map((reserva) => (
                    <tr key={reserva.id}>
                      <td>{reserva.numHabitacion}</td>
                      <td>
                        {reserva.cliente.name} {reserva.cliente.lastname}
                      </td>
                      <td>{reserva.fechaEntrada}</td>
                      <td>{reserva.fechaSalida}</td>
                      <td>
                        <button
                          className="recepcion-btn recepcion-btn-warning"
                          onClick={() => checkOut(reserva.id)}
                        >
                          <i className="fas fa-sign-out-alt"></i> Check-Out
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Cargando reservas...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
