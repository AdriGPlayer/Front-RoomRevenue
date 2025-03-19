import { AnimatePresence, motion } from "motion/react";

export default function TitleComponent() {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ x: "-100vh", opacity: 0 }} // Aparece desde abajo
          animate={{ x: 0, opacity: 1 }} // Llega al centro
          exit={{ x: "100vh", opacity: 0 }} // Sale hacia abajo
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.5,
          }}
        >
          <h1 className="recepcion-titulo">Panel de Recepcionista</h1>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
