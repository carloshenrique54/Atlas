import { motion } from "framer-motion";

function Splash() {
  return (
    <motion.div
      className="splash"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1, delay: 1 }}
    >
      <img src="../imagens/Logo.png" className="logo" alt="Imagem da Logo" />
    </motion.div>
  );
}

export default Splash