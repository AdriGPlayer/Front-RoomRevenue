import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import AddHuesped from "./AddHuesped";
import AddReserva from "./AddReserva";
import AsignarHabitacion from "./AsignarHabitacion";
import ReservaService from "../../../../services/ReservaService";

export default function ListReservas() {
  const [isModalHuespedOpen, setIsModalHuespedOpen] = useState(false);
  const [isModalReservaOpen, setIsModalReservaOpen] = useState(false);
  const [isModalHabitacionesOpen, setIsModalHabitacionesOpen] = useState(false);

  const [huesped, setHuesped] = useState(null);
  const [reserva, setReserva] = useState(null);
  const [reservas, setReservas] = useState([]);

  // Función reutilizable para manejar apertura/cierre
  const toggleModal = (setter, value) => setter(value);

  // Cargar reservas al montar el componente
  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    try {
      const response = await ReservaService.getAllReservas();
      setReservas(response.data);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ x: "100vh", opacity: 0 }} // Aparece desde abajo
          animate={{ x: 0, opacity: 1 }} // Llega al centro
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.5,
          }}
        >
          <h2>Gestión de Reservas</h2>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          initial={{ y: "-100vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.5,
          }}
        >
          <button
            className="add-user-btn"
            onClick={() => toggleModal(setIsModalHuespedOpen, true)}
          >
            <i className="fas fa-plus" />
            &nbsp; Agregar Nueva Reserva
          </button>

          {/* Modales */}
          {isModalHuespedOpen && (
            <AddHuesped
              closeModal={() => toggleModal(setIsModalHuespedOpen, false)}
              openNextModal={() => toggleModal(setIsModalReservaOpen, true)}
              setHuesped={setHuesped}
            />
          )}
          {isModalReservaOpen && (
            <AddReserva
              closeModal={() => toggleModal(setIsModalReservaOpen, false)}
              openNextModal={() =>
                toggleModal(setIsModalHabitacionesOpen, true)
              }
              setReserva={setReserva}
            />
          )}
          {isModalHabitacionesOpen && (
            <AsignarHabitacion
              huesped={huesped}
              reserva={reserva}
              closeModal={() => toggleModal(setIsModalHabitacionesOpen, false)}
            />
          )}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          initial={{ y: "100vh", opacity: 0 }} // Aparece desde abajo
          animate={{ y: 0, opacity: 1 }} // Llega al centro
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.8,
          }}
        >
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha Entrada</th>
                <th>Fecha Salida</th>
                <th>Número de Huéspedes</th>
                <th>Estado de Reserva</th>
                <th>Tarifa</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>
                  <td>{reserva.fechaEntrada}</td>
                  <td>{reserva.fechaSalida}</td>
                  <td>{reserva.numeroHuespedes}</td>
                  <td>{reserva.estatus}</td>
                  <td>${reserva.tarifa.toFixed(2)}</td>
                  <td>
                    <button className="btn btn-edit">
                      <i className="fas fa-edit" />
                    </button>
                    <button className="btn btn-delete">
                      <i className="fas fa-trash-alt" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
