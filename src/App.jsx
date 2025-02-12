import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/pages/Login/Login";
import PanelGeneral from "./components/pages/GerenteGeneral/PanelGeneral";

import LayOut from "./components/pages/GerenteGeneral/GestionPersonal/LayOut";
import LayOutReservas from "./components/pages/GerenteGeneral/GestionReservas/LayOutReservas";
import LayOutHabitaciones from "./components/pages/GerenteGeneral/GestionHabitaciones/LayOutHabitaciones";
import LayOutRecepcion from "./components/pages/GerenteGeneral/Recepcion/LayOutRecepcion";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/gerente-general" element={<PanelGeneral />}></Route>
          {/* rutas para gestionar personal */}
          <Route
            path="/gerente-general/list/recepcionistas"
            element={<LayOut usertype="RECEPCIONISTA" />}
          />
          <Route
            path="/gerente-general/list/div-cuartos"
            element={<LayOut usertype="GERENTE_DIV_CUARTOS" />}
          />
          <Route
            path="/gerente-general/list/gerente-reservaciones"
            element={<LayOut usertype="GERENTE_RESERVACIONES" />}
          />

          {/* Gestionar reservas */}
          <Route path="/gestionar-reservas/list" element={<LayOutReservas />} />

          {/* Gestionar Habitaciones */}
          <Route
            path="/gestionar-habitaciones"
            element={<LayOutHabitaciones />}
          />

          {/* Recepcion */}
          <Route path="/recepcion" element={<LayOutRecepcion />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
