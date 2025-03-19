import { useNavigate } from "react-router-dom";
import "./Styles/LogOut.css";

export default function LogOut() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <button className="logout-btn" onClick={logout}>
      <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
    </button>
  );
}
