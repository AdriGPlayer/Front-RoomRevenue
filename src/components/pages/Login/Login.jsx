import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir después del login

import "../../styles/Login.css";
import AuthService from "../../../services/AuthService";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(""); // Para mostrar errores en la UI
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página

    try {
      const response = await AuthService.login(usuario, contraseña);
      if (response.data.success) {
        // Guardar el userType en localStorage o en un contexto global si lo usas
        localStorage.setItem("userType", response.data.userType);

        // Redirigir según el tipo de usuario
        switch (response.data.userType) {
          case "GERENTE_GENERAL":
            navigate("/gerente-general");
            break;
          case "GERENTE_DIV_CUARTOS":
            navigate("/gestionar-habitaciones");
            break;
          case "RECEPCIONISTA":
            navigate("/recepcion");
            break;
          case "GERENTE_RESERVACIONES":
            navigate("/gestionar-reservas/list");
            break;
          default:
            navigate("/"); // O alguna página por defecto
        }
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setError("Error en la autenticación, intenta de nuevo.");
      console.error(error);
    }
  };

  return (
    <div className="container-login">
      <div className="card">
        <a className="singup">RoomRevenue</a>
        <p className="singup">Login</p>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Muestra errores */}
        <form onSubmit={handleSubmit}>
          <div className="inputBox">
            <input
              type="text"
              required
              name="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <span>Username</span>
          </div>

          <div className="inputBox">
            <input
              type="password"
              required
              name="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
            <span>Password</span>
          </div>

          <button type="submit" className="enter">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
