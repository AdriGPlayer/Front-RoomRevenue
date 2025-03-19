import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReservaService from "../../../services/ReservaService";

export default function HuespedLogin() {
  const [numHabitacion, setNumHabitacion] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await ReservaService.getReservaByEmailAndNumHabitacion(
        numHabitacion,
        email
      );

      if (response.status === 200) {
        const reserva = response.data;
        if (reserva.estatus === "CONFIRMADA") {
          // Guardar datos en localStorage
          localStorage.setItem("huespedId", reserva.idCliente);
          localStorage.setItem("reservaId", reserva.id);

          // Redirigir a dashboard
          navigate("/dashboard-huesped");
        } else {
          setError("La reserva no está confirmada.");
        }
      }
    } catch (err) {
      setError("No se encontró una reserva confirmada con estos datos.");
      console.log(err);
    }
  };

  return (
    <div className="container-login-huesped">
      <div className="card">
        <a className="singup">Portal de Huéspedes</a>
        <p>Ingrese su número de habitación y email para acceder</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <input
              type="text"
              required
              name="habitacion"
              value={numHabitacion}
              onChange={(e) => setNumHabitacion(e.target.value)}
            />
            <span>Número Habitación</span>
          </div>

          <div className="inputBox">
            <input
              type="email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Email</span>
          </div>

          <button type="submit" className="enter">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
