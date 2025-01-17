import DashBoard from "./Dashboard/DashBoard";
import SideBar from "./Navigation/SideBar";
import "./Navigation/styles/styles-nav.css";
export default function PanelGeneral() {
  return (
    <div className="container">
      <SideBar />
      <DashBoard />
    </div>
  );
}
