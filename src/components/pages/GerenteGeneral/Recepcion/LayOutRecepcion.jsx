import SideBar from "../Navigation/SideBar";
import RecepcionComponent from "./RecepcionComponent";

export default function LayOutRecepcion() {
  return (
    <>
      <div className="container">
        <SideBar />
        <RecepcionComponent />
      </div>
    </>
  );
}
