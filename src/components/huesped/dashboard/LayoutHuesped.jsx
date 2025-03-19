import { AnimatePresence, motion } from "motion/react";
import HeaderComponent from "./HeaderComponent";
import WelcomeHuesped from "./WelcomeHuesped";

export default function LayoutHuesped() {
  return (
    <>
      <div className="huesped-container">
        <AnimatePresence>
          <motion.div
            initial={{ x: "-100vh", opacity: 0 }} // Aparece desde abajo
            animate={{ x: 0, opacity: 1 }} // Llega al centro
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.5,
            }}
          >
            <HeaderComponent />
          </motion.div>
        </AnimatePresence>

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
            <WelcomeHuesped />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
