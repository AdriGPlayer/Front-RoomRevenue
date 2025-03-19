import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import AddHuesped from "./AddHuesped";
import AddReserva from "./AddReserva";
import AsignarHabitacion from "./AsignarHabitacion";
import ReservaService from "../../../../services/ReservaService";
import ListHuesped from "./ListHuesped";
import ListHabitacion from "./ListHabitacion";
import PropTypes from "prop-types";

export default function ListReservas({ mostrarAcciones, title }) {
  const [isModalHuespedOpen, setIsModalHuespedOpen] = useState(false);
  const [isModalReservaOpen, setIsModalReservaOpen] = useState(false);
  const [isModalHabitacionesOpen, setIsModalHabitacionesOpen] = useState(false);
  const [isModalListHuesped, setIsModalListHuesped] = useState(false);
  const [isModalListHabitacion, setIsModalListHabitacion] = useState(false);
  const [huesped, setHuesped] = useState(null);
  const [reserva, setReserva] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [idCliente, setIdCliente] = useState(null);
  const [numHabitacion, setNumHabitacion] = useState(null);
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

  const handleCloseAsignarHabitacion = () => {
    toggleModal(setIsModalHabitacionesOpen, false);
    fetchReservas();
  };

  const confirmarReserva = async (id) => {
    try {
      await ReservaService.confirmarReserva(id);
      fetchReservas(); // Actualiza la lista de reservas después de confirmar
    } catch (error) {
      console.error("Error al confirmar la reserva:", error);
    }
  };

  const eliminarReserva = async (id) => {
    try {
      await ReservaService.eliminarReserva(id);
      fetchReservas(); // Actualiza la lista de reservas después de eliminar
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
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
          <h2>{title}</h2>
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
              closeModal={handleCloseAsignarHabitacion}
            />
          )}
          {isModalListHuesped && (
            <ListHuesped
              closeModal={() => toggleModal(setIsModalListHuesped, false)}
              id={idCliente}
            />
          )}
          {isModalListHabitacion && (
            <ListHabitacion
              closeModal={() => toggleModal(setIsModalListHabitacion, false)}
              numHabitacion={numHabitacion}
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
          <div className="table-container ">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha Entrada</th>
                  <th>Fecha Salida</th>
                  <th>Número de Huéspedes</th>
                  <th>Estado de Reserva</th>
                  <th>Tarifa</th>
                  <th>Huesped</th>
                  <th>Habitacion</th>
                  {mostrarAcciones && <th>Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {reservas
                  .filter((reserva) => reserva.estatus !== "COMPLETADA") // Filtrar las reservas completadas
                  .map((reserva) => (
                    <tr key={reserva.id}>
                      <td>{reserva.id}</td>
                      <td>{reserva.fechaEntrada}</td>
                      <td>{reserva.fechaSalida}</td>
                      <td>{reserva.numeroHuespedes}</td>
                      <td>{reserva.estatus}</td>
                      <td>${reserva.tarifa.toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-edit"
                          onClick={() => {
                            setIdCliente(reserva.idCliente);
                            toggleModal(setIsModalListHuesped, true);
                          }}
                        >
                          <i className="fas fa-users" />
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-edit"
                          onClick={() => {
                            setNumHabitacion(reserva.numHabitacion);
                            toggleModal(setIsModalListHabitacion, true);
                          }}
                        >
                          <i className="fas fa-bed" />
                        </button>
                      </td>
                      {mostrarAcciones && (
                        <td>
                          <button className="btn btn-edit">
                            <i className="fas fa-edit" />
                          </button>
                          {reserva.estatus !== "CONFIRMADA" && (
                            <button
                              className="btn btn-edit"
                              onClick={() => confirmarReserva(reserva.id)}
                            >
                              <i className="fas fa-check" />
                            </button>
                          )}
                          <button
                            className="btn btn-delete"
                            onClick={() => eliminarReserva(reserva.id)}
                          >
                            <i className="fas fa-trash-alt" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

ListReservas.propTypes = {
  mostrarAcciones: PropTypes.bool,
  title: PropTypes.string,
};
