import LogOut from "../../../common/LogOut";
import NavComponent from "./NavComponent";
export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <h3 className="typewriter">
          RoomRevenue.<span>&#160;</span>
        </h3>
      </div>
      <NavComponent />
      <LogOut />
    </div>
  );
}
