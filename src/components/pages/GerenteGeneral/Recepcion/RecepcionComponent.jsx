import ListReservas from "../GestionReservas/ListReservas";
import HuespedesComponent from "./HuespedesComponent";
import TitleComponent from "./TitleComponent";

export default function RecepcionComponent() {
  return (
    <>
      <div className="recepcion-container">
        <TitleComponent />
        <div className="recepcion-panel">
          <ListReservas mostrarAcciones={false} title={"Check in"} />
        </div>
        <HuespedesComponent />
      </div>
    </>
  );
}
