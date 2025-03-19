import PropTypes from "prop-types";
import { useState } from "react";
import LayOutModalHuesped from "./roomservice/LayOutModalHuesped";

export default function WelcomeHuesped() {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const servicios = [
    {
      titulo: "Servicio a la Habitación",
      icono: "fa-solid fa-utensils",
      descripcion:
        "Ordene comidas y bebidas directamente a su habitación. Disponible 24/7.",
      accion: "Ver Menú",
    },
    {
      titulo: "Limpieza y Mantenimiento",
      icono: "fa-solid fa-broom",
      descripcion:
        "Solicite servicios de limpieza o reporte problemas que requieran mantenimiento.",
      accion: "Solicitar Servicio",
    },
    {
      titulo: "Actividades y Spa",
      icono: "fa-solid fa-spa",
      descripcion:
        "Reserve su lugar en nuestras actividades, spa, gimnasio o servicios de transporte.",
      accion: "Reservar",
    },
  ];

  const openModal = (servicio) => {
    setModalContent(servicio);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };
  return (
    <>
      <>
        <div className="huesped-welcome">
          <h1>Portal del Huésped</h1>
          <p>
            Disfrute de su estancia con nosotros. ¿En qué podemos ayudarle hoy?
          </p>
        </div>

        <div className="huesped-services">
          {servicios.map((servicio, index) => (
            <ServicioCard key={index} {...servicio} openModal={openModal} />
          ))}
        </div>

        {/* render modal */}
        <LayOutModalHuesped
          isOpen={isModalOpen}
          closeModal={closeModal}
          content={modalContent}
        />
      </>
    </>
  );
}

function ServicioCard({ titulo, icono, descripcion, accion, openModal }) {
  return (
    <div className="huesped-service-card">
      <h2>
        <i className={icono} aria-hidden="true"></i> {titulo}
      </h2>
      <p>{descripcion}</p>
      <button
        className="huesped-btn"
        onClick={() => openModal({ titulo, descripcion })}
      >
        <i className="fa-solid fa-arrow-right" aria-hidden="true"></i> {accion}
      </button>
    </div>
  );
}

ServicioCard.propTypes = {
  titulo: PropTypes.string.isRequired,
  icono: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  accion: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
