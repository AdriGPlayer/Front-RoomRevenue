import { AnimatePresence, motion } from "framer-motion";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import HabitacionService from "../../../../services/HabitacionService";
import ClienteService from "../../../../services/ClienteService";
import ReservaService from "../../../../services/ReservaService";

export default function AsignarHabitacion({ huesped, reserva, closeModal }) {
  const [isVisible, setIsVisible] = useState(true);
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    // Llamada al servicio para obtener las habitaciones
    HabitacionService.getAllHabitaciones()
      .then((response) => {
        setHabitaciones(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener habitaciones:", error);
      });
  }, []);
  const getCosto = (tipoHabitacion) => {
    switch (tipoHabitacion) {
      case "STANDARD":
        return 100;
      case "SUITE":
        return 300;
      case "PRESIDENCIAL":
        return 500;
      default:
        return 0;
    }
  };
  const guardarCliente = () => {
    ClienteService.postCliente(huesped);
  };

  const modificarTarifa = (numHabitacion) => {
    // Buscar la habitación seleccionada
    const habitacionSeleccionada = habitaciones.find(
      (habitacion) => habitacion.numHabitacion === numHabitacion
    );

    if (habitacionSeleccionada) {
      const tipoHabitacion = habitacionSeleccionada.tipoHabitacion; // Obtener el tipo de habitación
      const costo = getCosto(tipoHabitacion); // Calcular el costo
      console.log(reserva);
      reserva.tarifa += costo;
    } else {
      console.error("No se encontró la habitación seleccionada");
    }
  };

  const asignarHabitacion = async (numHabitacion) => {
    guardarCliente();
    const email = huesped.email;
    const response = await ClienteService.getByEmail(email);
    const cliente = response.data;
    const idCliente = cliente.id;
    modificarTarifa(numHabitacion);
    ReservaService.postReserva(idCliente, numHabitacion, reserva);
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(closeModal());
    }, 500);
  };
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="modal-overlay">
          <motion.div
            className="modal-content-habitacion"
            initial={{ x: "100vh", opacity: 0 }} // Aparece desde abajo
            animate={{ x: 0, opacity: 1 }} // Llega al centro
            exit={{ y: "100vh", opacity: 0 }} // Sale hacia abajo
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.5,
            }}
          >
            <h2>Reserva en Proceso: Seleccione Habitación</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Número de Habitación</th>
                    <th>Tipo de Habitación</th>
                    <th>Costo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {habitaciones.map((habitacion) => (
                    <tr key={habitacion.id}>
                      <td>{habitacion.numHabitacion}</td>
                      <td>{habitacion.tipoHabitacion}</td>
                      <td>${getCosto(habitacion.tipoHabitacion)}</td>
                      <td>
                        <button
                          className="asignar"
                          onClick={() => {
                            asignarHabitacion(habitacion.numHabitacion);
                          }}
                        >
                          Asignar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              className="cancelar"
              onClick={handleCancel}
              // Llama a la función de animación de salida
            >
              Cancelar
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

AsignarHabitacion.propTypes = {
  closeModal: PropTypes.func.isRequired,
  huesped: PropTypes.object.isRequired,
  reserva: PropTypes.object.isRequired,
};
