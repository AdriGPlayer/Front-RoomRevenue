import { AnimatePresence, motion } from "motion/react";
import HeaderComponent from "../HeaderComponent";
import ContentRoomService from "./ContentRoomService";
import DetallesForm from "./DetallesForm";

export default function LayOutModalHuesped({ isOpen, closeModal, content }) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="modal-overlay ">
            <motion.div
              className="modal-content-huesped table-container-huesped"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* <h2>{content.titulo}</h2>
              <p>{content.descripcion}</p> */}
              <HeaderComponent title={content.titulo} />
              <ContentRoomService />
              <DetallesForm />
              <button onClick={closeModal} className="huesped-btn">
                {" "}
                Cerrar Modal
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
