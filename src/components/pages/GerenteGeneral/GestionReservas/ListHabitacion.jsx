import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import HabitacionService from "../../../../services/HabitacionService";

export default function ListHabitacion({ closeModal, numHabitacion }) {
  const [isVisible, setIsVisible] = useState(true);
  const [habitacion, setHabitacion] = useState(null);

  useEffect(() => {
    if (numHabitacion) {
      HabitacionService.getHabitacionByNumHabitacion(numHabitacion)
        .then((response) => setHabitacion(response.data))
        .catch((error) => console.error("Error al obtener habitación:", error));
    }
  }, [numHabitacion]);

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(closeModal, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="modal-overlay">
          <motion.div
            className="modal-content-user"
            initial={{ x: "100vh", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ y: "100vh", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.5,
            }}
          >
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Número</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {habitacion ? (
                    <tr>
                      <td>{habitacion.numHabitacion}</td>
                      <td>{habitacion.tipoHabitacion}</td>
                      <td>{habitacion.estado}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="3">Cargando o no hay datos...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <button type="button" className="cancelar" onClick={handleCancel}>
              Cancelar
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

ListHabitacion.propTypes = {
  closeModal: PropTypes.func.isRequired,
  numHabitacion: PropTypes.number.isRequired,
};
