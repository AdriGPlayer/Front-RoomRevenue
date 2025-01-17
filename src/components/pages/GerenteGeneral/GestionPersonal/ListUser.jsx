import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import UserService from "../../../../services/UserService";
import AddUser from "./AddUser";
import ConfirmAction from "./ConfirmAction";
import { AnimatePresence, motion } from "motion/react";

export default function ListUser({ usertype }) {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Nuevo estado para confirmar eliminación
  const [selectedUserId, setSelectedUserId] = useState(null); // Estado para guardar el ID del usuario a eliminar
  const [title, setTitle] = useState("");
  const listarUsuarios = () => {
    UserService.getUserType(usertype)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    listarUsuarios();
    titulo();
  }, []);

  // Función para abrir el modal para agregar un nuevo usuario
  const openAddUserModal = () => {
    setSelectedUserId(null); // Limpiamos el ID para asegurarnos de que es modo agregar
    setIsModalOpen(true);
  };

  // Función para abrir el modal para editar un usuario existente
  const openEditUserModal = (id) => {
    setSelectedUserId(id); // Guardamos el ID del usuario a editar
    setIsModalOpen(true);
  };

  // Función para abrir el modal de confirmación de eliminación
  const openConfirmDeleteModal = (id) => {
    setSelectedUserId(id); // Guardamos el ID del usuario a eliminar
    setIsConfirmModalOpen(true); // Mostramos el modal de confirmación
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsConfirmModalOpen(false); // Cerramos ambos modales
    setSelectedUserId(null); // Limpiamos el ID seleccionado
    listarUsuarios(); // Recargamos la lista de usuarios
  };

  const titulo = () => {
    switch (usertype) {
      case "GERENTE_DIV_CUARTOS":
        setTitle("Gerentes de Divición de Cuartos");
        break;
      case "GERENTE_RESERVACIONES":
        setTitle("Gerente de Reservaciones");
        break;
      case "RECEPCIONISTA":
        setTitle("Recepcionistas");
        break;
      default:
        setTitle("No se contro un usuario");
        break;
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ x: "100vh", opacity: 0 }} // Aparece desde abajo
          animate={{ x: 0, opacity: 1 }} // Llega al centro
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.5,
          }}
        >
          <h1>Gestión de {title}</h1>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          initial={{ y: "100vh", opacity: 0 }} // Aparece desde abajo
          animate={{ y: 0, opacity: 1 }} // Llega al centro
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.5,
          }}
        >
          <button className="add-user-btn" onClick={openAddUserModal}>
            <i className="fas fa-plus"></i> Agregar Nuevo Usuario
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Mostrar modal de agregar/editar si isModalOpen es true */}
      {isModalOpen && (
        <AddUser
          usertype={usertype}
          idUser={selectedUserId} // Pasamos el ID del usuario o null
          closeModal={closeModal} // Pasamos la función para cerrar el modal
          titulo={title}
        />
      )}

      {/* Mostrar modal de confirmación si isConfirmModalOpen es true */}
      {isConfirmModalOpen && (
        <ConfirmAction
          closeModal={closeModal} // Pasamos la función para cerrar el modal
          idUser={selectedUserId} // Llamamos a deleteUser si confirma la eliminación
        />
      )}
      <AnimatePresence>
        <motion.div
          initial={{ y: "-100vh", opacity: 0 }} // Aparece desde abajo
          animate={{ y: 0, opacity: 1 }} // Llega al centro
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.5,
          }}
        >
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.lastname}</td>
                  <td>{user.user}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => openEditUserModal(user.id)} // Llamamos a la función para editar
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => openConfirmDeleteModal(user.id)} // Llamamos a la función para abrir el modal de confirmación
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

ListUser.propTypes = {
  usertype: PropTypes.string.isRequired, // usertype debe ser una cadena y obligatorio
};
