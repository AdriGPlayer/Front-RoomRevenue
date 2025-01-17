import { AnimatePresence, motion } from "motion/react";

export default function DashBoard() {
  return (
    <div className="main-content">
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
          <h1>Dashboard del Gerente General</h1>
        </motion.div>
      </AnimatePresence>

      <div className="dashboard">
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
            <div className="dashboard-item">
              <h3>Ingresos Mensuales</h3>
              <p>$50,000</p>
              <span className="subtitle">+5% vs. mes anterior</span>
            </div>
          </motion.div>
        </AnimatePresence>
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
            <div className="dashboard-item">
              <h3>Reservas Actuales</h3>
              <p>25</p>
              <span className="subtitle">3 check-ins hoy</span>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          <motion.dev
            initial={{ y: "100vh", opacity: 0 }} // Aparece desde abajo
            animate={{ y: 0, opacity: 1 }} // Llega al centro
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.5,
            }}
          >
            <div className="dashboard-item">
              <h3>Ocupación</h3>
              <p>75%</p>
              <span className="subtitle">+10% vs. semana anterior</span>
            </div>
          </motion.dev>
        </AnimatePresence>
        <AnimatePresence>
          <motion.dev
            initial={{ y: "100vh", opacity: 0 }} // Aparece desde abajo
            animate={{ y: 0, opacity: 1 }} // Llega al centro
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.5,
            }}
          >
            <div className="dashboard-item">
              <h3>Mantenimiento Pendiente</h3>
              <p>3</p>
              <span className="subtitle">Habitaciones en reparación</span>
            </div>
          </motion.dev>
        </AnimatePresence>
      </div>
    </div>
  );
}
