import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import UserService from "../../../../services/UserService";

export default function AddUser({ closeModal, usertype, idUser, titulo }) {
  const [isVisible, setIsVisible] = useState(true);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const saveOrUpdate = (e) => {
    e.preventDefault();
    const user = {
      name: name,
      lastname: lastname,
      user: username,
      password: password,
      email: email,
      userType: usertype,
    };
    if (idUser) {
      UserService.updateUser(idUser, user)
        .then(() => {
          setIsVisible(false);
          setTimeout(closeModal, 500);
        })
        .catch(console.error);
    } else {
      UserService.addUser(user)
        .then(() => {
          setIsVisible(false);
          setTimeout(closeModal, 500);
        })
        .catch(console.error);
    }
  };
  const handleCancel = () => {
    setIsVisible(false); // Activa la animación de salida
    setTimeout(closeModal, 500); // Espera que termine la animación antes de desmontar
  };

  useEffect(() => {
    if (idUser) {
      UserService.getUserById(idUser)
        .then((response) => {
          const { name, lastname, user, email } = response.data;
          setName(name);
          setLastname(lastname);
          setUser(user);
          setPassword("");
          setEmail(email);
        })
        .catch(console.error);
    }
  }, [idUser]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="modal-overlay">
          <motion.div
            className="modal-content"
            initial={{ x: "100vh", opacity: 0 }} // Aparece desde abajo
            animate={{ x: 0, opacity: 1 }} // Llega al centro
            exit={{ y: "100vh", opacity: 0 }} // Sale hacia abajo
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.5,
            }}
          >
            <h2>
              {idUser ? "Actualizar " : "Agregar "} {titulo}
            </h2>

            <form action="" onSubmit={saveOrUpdate}>
              <div className="inputBox">
                <input
                  type="text"
                  required
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <span>Nombre</span>
              </div>

              <div className="inputBox">
                <input
                  type="text"
                  required
                  name="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <span>Apellido</span>
              </div>

              <div className="inputBox">
                <input
                  type="text"
                  required
                  name="username"
                  value={username}
                  onChange={(e) => setUser(e.target.value)}
                />
                <span>Usuario</span>
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  required
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span>Password</span>
              </div>
              <div className="inputBox">
                <input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span>Email</span>
              </div>

              <button type="submit" className="enter">
                Enter
              </button>
              <button
                type="button"
                className="cancelar"
                onClick={handleCancel} // Llama a la función de animación de salida
              >
                Cancelar
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Validación de props con PropTypes
AddUser.propTypes = {
  closeModal: PropTypes.func.isRequired,
  usertype: PropTypes.string.isRequired,
  idUser: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.null,
  ]),
  titulo: PropTypes.string.isRequired,
};
