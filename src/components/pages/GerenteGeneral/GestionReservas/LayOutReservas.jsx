import SideBar from "../Navigation/SideBar";
import ListReservas from "./ListReservas";

export default function LayOutReservas() {
  return (
    <>
      <div className="container">
        <SideBar />
        <div className="main-content">
          <ListReservas mostrarAcciones={true} title={"Gestión de Reservas"} />
        </div>
      </div>
    </>
  );
}
