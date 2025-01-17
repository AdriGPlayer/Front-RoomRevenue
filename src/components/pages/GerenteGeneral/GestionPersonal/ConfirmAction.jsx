import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import UserService from "../../../../services/UserService";
import PropTypes from "prop-types";
export default function ConfirmAction({ closeModal, idUser }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleCancel = () => {
    setIsVisible(false); // Activa la animación de salida
    setTimeout(closeModal, 500); // Espera que termine la animación antes de desmontar
  };

  // Función para eliminar un usuario
  const deleteUser = () => {
    if (idUser) {
      UserService.deleteUSer(idUser) // Llama al servicio de eliminación
        .then(() => {
          closeModal(); // Cierra los modales y recarga la lista
        })
        .catch((error) => {
          console.error("Error al eliminar usuario:", error);
        });
      setIsVisible(false); // Activa la animación de salida
      setTimeout(closeModal, 500); // Espera que termine la animación antes de desmontar
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="modal-overlay">
          <motion.div
            className="modal-content"
            initial={{ x: "-100vh", opacity: 0 }} // Aparece desde abajo
            animate={{ x: 0, opacity: 1 }} // Llega al centro
            exit={{ y: "-100vh", opacity: 0 }} // Sale hacia abajo
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.5,
            }}
          >
            {/* Contenido */}
            <h3>¿Realmente quieres eliminar el usuario con id: {idUser}?</h3>
            <button
              type="button"
              className="cancelar"
              onClick={handleCancel} // Llama a la función de animación de salida
            >
              Cancelar
            </button>
            <button className="enter" onClick={deleteUser}>
              Enter
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ConfirmAction.propTypes = {
//   closeModal: PropTypes.func.isRequired,
//   idUser: PropTypes.oneOfType([
//     PropTypes.number,
//     PropTypes.string,
//     PropTypes.null,
//   ]),
// };
