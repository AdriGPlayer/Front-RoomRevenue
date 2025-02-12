import SideBar from "../Navigation/SideBar";
import GestionHabitaciones from "./GestionHabitaciones";

export default function LayOutHabitaciones() {
  return (
    <>
      <div className="container">
        <SideBar />
        <div className="main-content">
          <GestionHabitaciones />
        </div>
      </div>
    </>
  );
}
