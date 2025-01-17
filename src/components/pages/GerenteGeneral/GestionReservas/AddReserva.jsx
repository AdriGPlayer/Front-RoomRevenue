import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function AddReserva({ closeModal, openNextModal, setReserva }) {
  const [isVisible, setIsVisible] = useState(true);
  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [numHuespedes, setNumHuespedes] = useState(1); // Establece valor inicial
  const [mensajeError, setMensajeError] = useState("");
  const [tarifa, setTarifa] = useState(0);

  const validarFecha = (fecha) => {
    const hoy = new Date();
    const fechaReserva = new Date(fecha);
    return fechaReserva >= hoy.setHours(0, 0, 0, 0); // Comparar solo fechas sin tiempo
  };

  const handleFechaEntradaChange = (e) => {
    const fecha = e.target.value;
    if (validarFecha(fecha)) {
      setFechaEntrada(fecha);
      setMensajeError(""); // Limpiar el mensaje de error si la fecha es válida
    } else {
      setMensajeError(
        "La fecha de entrada no puede ser anterior a la fecha actual."
      );
      setFechaEntrada("");
    }
  };

  const handleFechaSalidaChange = (e) => {
    const fecha = e.target.value;
    if (validarFecha(fecha)) {
      setFechaSalida(fecha);
      setMensajeError(""); // Limpiar el mensaje de error si la fecha es válida
    } else {
      setMensajeError(
        "La fecha de salida no puede ser anterior a la fecha actual."
      );
      setFechaSalida("");
    }
  };

  const handleNumHuespedesChange = (e) => {
    const num = e.target.value;
    setNumHuespedes(num > 0 ? num : 1); // Asegura que el número de huéspedes sea positivo
  };

  const calcularTarifa = (fechaEntrada, fechaSalida, numHuespedes) => {
    if (!fechaEntrada || !fechaSalida) return 0;
    const entrada = new Date(fechaEntrada);
    const salida = new Date(fechaSalida);
    const diferienciaEnTiempo = salida - entrada;
    const diferienciaEnDias = Math.ceil(
      diferienciaEnTiempo / (1000 * 3600 * 24)
    );
    const tarifaPorDia = 100;
    let tarifaBase = diferienciaEnDias * tarifaPorDia;

    // Calcular incremento basado en el número de huéspedes
    const incremento =
      numHuespedes > 1 ? (numHuespedes - 1) * 0.05 * tarifaBase : 0;
    const tarifaFinal = tarifaBase + incremento;

    return tarifaFinal;
  };

  useEffect(() => {
    setTarifa(calcularTarifa(fechaEntrada, fechaSalida, numHuespedes));
  }, [fechaEntrada, fechaSalida, numHuespedes]); // Dependencias corregidas

  const handleCancel = () => {
    setIsVisible(false); // Activa la animación de salida
    setTimeout(closeModal, 500); // Espera que termine la animación antes de desmontar
  };

  const handleEnter = () => {
    const nuevaTarifa = calcularTarifa(fechaEntrada, fechaSalida, numHuespedes);
    setTarifa(nuevaTarifa);
    const reserva = {
      fechaEntrada: fechaEntrada,
      fechaSalida: fechaSalida,
      numeroHuespedes: numHuespedes,
      tarifa: tarifa,
      estatus: "PENDIENTE",
    };
    setReserva(reserva);
    setIsVisible(false);
    setTimeout(() => {
      closeModal(); // Cierra el modal actual
      openNextModal(); // Abre el siguiente modal
    }, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="modal-overlay">
          <motion.div
            className="modal-content"
            initial={{ y: "100vh", opacity: 0 }} // Aparece desde abajo
            animate={{ y: 0, opacity: 1 }} // Llega al centro
            exit={{ x: "100vh", opacity: 0 }} // Sale hacia abajo
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.5,
            }}
          >
            <h2>Reserva En Proceso: Ingresa La Información De La Reserva</h2>
            {mensajeError && <div className="error">{mensajeError}</div>}
            <form className="reservation-form">
              <div className="form-group">
                <label>Fecha de Entrada:</label>
                <input
                  type="date"
                  id="check-in-date"
                  name="check-in-date"
                  value={fechaEntrada}
                  onChange={handleFechaEntradaChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Fecha de Salida:</label>
                <input
                  type="date"
                  id="check-out-date"
                  name="check-out-date"
                  value={fechaSalida}
                  onChange={handleFechaSalidaChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Número de Huéspedes:</label>
                <input
                  type="number"
                  id="guests-number"
                  name="guests-number"
                  min="1"
                  value={numHuespedes}
                  onChange={handleNumHuespedesChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Tarifa</label>
                <br></br>
                <input
                  type="number"
                  id="tarifa"
                  required="required"
                  min="0"
                  value={tarifa}
                  readOnly
                />
              </div>

              <button type="button" className="cancelar" onClick={handleCancel}>
                Cancelar
              </button>
              <button type="button" className="enter" onClick={handleEnter}>
                Confirmar Reserva
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

AddReserva.propTypes = {
  closeModal: PropTypes.func.isRequired,
  openNextModal: PropTypes.func.isRequired,
  setReserva: PropTypes.func.isRequired,
};
