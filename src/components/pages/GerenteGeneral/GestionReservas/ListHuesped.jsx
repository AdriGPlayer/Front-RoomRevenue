import { AnimatePresence, motion } from "motion/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ClienteService from "../../../../services/ClienteService";
export default function ListHuesped({ closeModal, id }) {
  const [isVisible, setIsVisible] = useState(true);
  const [huesped, setHuesped] = useState(null);

  useEffect(() => {
    if (id) {
      ClienteService.getById(id)
        .then((response) => setHuesped(response.data))
        .catch((error) => console.error("Error al obtener huésped:", error));
    }
  }, [id]);

  const handleCancel = () => {
    setIsVisible(false); // Activa la animación de salida
    setTimeout(closeModal, 500); // Espera que termine la animación antes de desmontar
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
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {huesped ? (
                    <tr>
                      <td>{huesped.name}</td>
                      <td>{huesped.lastname}</td>
                      <td>{huesped.email}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="3">Cargando o no hay datos...</td>
                    </tr>
                  )}
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

ListHuesped.propTypes = {
  closeModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
