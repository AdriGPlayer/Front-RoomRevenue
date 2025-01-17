import SideBar from "../Navigation/SideBar";
import ListUser from "./ListUser";
import PropTypes from "prop-types";
export default function LayOut({ usertype }) {
  return (
    <div className="container">
      <SideBar />
      <div className="main-content">
        <ListUser usertype={usertype} />
      </div>
    </div>
  );
}

LayOut.propTypes = {
  usertype: PropTypes.string.isRequired, // usertype debe ser una cadena y obligatorio
};
