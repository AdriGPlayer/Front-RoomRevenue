import { AnimatePresence, motion } from "motion/react";
import PropTypes from "prop-types";
import { useState } from "react";

export default function AddHuesped({ closeModal, openNextModal, setHuesped }) {
  const [isVisible, setIsVisible] = useState(true);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);

  const handleCancel = () => {
    setIsVisible(false); // Activa la animación de salida
    setTimeout(closeModal, 500); // Espera que termine la animación antes de desmontar
  };

  const validateFields = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!lastname.trim()) newErrors.lastname = "El apellido es obligatorio.";
    if (!email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El formato del email no es válido.";
    }
    return newErrors;
  };

  const handleEnter = (e) => {
    e.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShake(true);
      setTimeout(() => setShake(false), 500); // Detener la sacudida después de 500ms
    } else {
      const cliente = { name, lastname, email };
      setHuesped(cliente);
      setErrors({});
      setIsVisible(false);
      setTimeout(() => {
        closeModal(); // Cierra el modal actual
        openNextModal(); // Abre el siguiente modal
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="modal-overlay">
          <motion.div
            className={`modal-content ${shake ? "shake" : ""}`}
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
            <h2>Reserva En Proceso: Ingresa Los Datos Del Huesped</h2>
            <form>
              <div className="inputBox">
                {errors.name && <small className="error">{errors.name}</small>}
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <span>Nombre</span>
              </div>

              <div className="inputBox">
                {errors.lastname && (
                  <small className="error">{errors.lastname}</small>
                )}
                <input
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <span>Apellido</span>
              </div>

              <div className="inputBox">
                {errors.email && (
                  <small className="error">{errors.email}</small>
                )}
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span>Email</span>
              </div>
              <button type="button" className="cancelar" onClick={handleCancel}>
                Cancelar
              </button>
              <button className="enter" onClick={handleEnter}>
                Enter
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

AddHuesped.propTypes = {
  closeModal: PropTypes.func.isRequired,
  openNextModal: PropTypes.func.isRequired,
  setHuesped: PropTypes.func.isRequired,
};
