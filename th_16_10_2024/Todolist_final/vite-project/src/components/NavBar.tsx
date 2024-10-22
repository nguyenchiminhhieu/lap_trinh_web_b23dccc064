import { ChevronsLeftRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ x: -30 }}
      animate={{ x: 0 }}
      transition={{ ease: "easeInOut" }}
      className="py-6 px-4 border-b border-gray-border"
    >
      <div
        className="text-white flex gap-2 items-center font-semibold hover:text-white/75 transition-all cursor-pointer"
        onClick={() => navigate("/")}
      >
        <ChevronsLeftRight />
    <h1>Todo list my work </h1>
      </div>
    </motion.div>
  );
};

export default NavBar;
