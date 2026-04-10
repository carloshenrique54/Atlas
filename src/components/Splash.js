import { motion } from "framer-motion";

export default function Splash() {
  return (
    <motion.div
      className="splash"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1, delay: 1 }}
    >
      <img src="../imagens/Logo.png" className="logo" />
    </motion.div>
  );
}