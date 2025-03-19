import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/pages/Login/Login";
import PanelGeneral from "./components/pages/GerenteGeneral/PanelGeneral";

import LayOut from "./components/pages/GerenteGeneral/GestionPersonal/LayOut";
import LayOutReservas from "./components/pages/GerenteGeneral/GestionReservas/LayOutReservas";
import LayOutHabitaciones from "./components/pages/GerenteGeneral/GestionHabitaciones/LayOutHabitaciones";
import LayOutRecepcion from "./components/pages/GerenteGeneral/Recepcion/LayOutRecepcion";
import PrivateRoute from "./components/pages/Login/PrivateRoute";
import HuespedLogin from "./components/huesped/login/HuespedLogin";
import LayoutHuesped from "./components/huesped/dashboard/layoutHuesped";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Ruta pública */}
          <Route path="/" element={<Login />} />

          {/* Gerente General: Tiene acceso a todas las rutas */}
          <Route element={<PrivateRoute allowedRoles={["GERENTE_GENERAL"]} />}>
            <Route path="/gerente-general" element={<PanelGeneral />} />
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
          </Route>

          {/* Gestionar reservas: Solo Gerentes de Reservaciones y Gerente General */}
          <Route
            element={
              <PrivateRoute
                allowedRoles={["GERENTE_RESERVACIONES", "GERENTE_GENERAL"]}
              />
            }
          >
            <Route
              path="/gestionar-reservas/list"
              element={<LayOutReservas />}
            />
          </Route>

          {/* Gestionar Habitaciones: Solo Gerente de División Cuartos y Gerente General */}
          <Route
            element={
              <PrivateRoute
                allowedRoles={["GERENTE_DIV_CUARTOS", "GERENTE_GENERAL"]}
              />
            }
          >
            <Route
              path="/gestionar-habitaciones"
              element={<LayOutHabitaciones />}
            />
          </Route>

          {/* Recepción: Solo Recepcionistas y Gerente General */}
          <Route
            element={
              <PrivateRoute
                allowedRoles={["RECEPCIONISTA", "GERENTE_GENERAL"]}
              />
            }
          >
            <Route path="/recepcion" element={<LayOutRecepcion />} />
          </Route>

          <Route path="/huesped" element={<HuespedLogin />} />
          <Route path="/dashboard-huesped" element={<LayoutHuesped />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
