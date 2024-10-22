import { motion, easeInOut } from "framer-motion";
const Hello = ({ name }: { name: string }) => {
  return (
    <div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: -5, easeInOut }}
          whileTap={{ scale: 0.9, easeInOut }}
        >
          <button className="bg-white rounded-md p-3 text-slate-900 font-semibold">
            Hello {name} !
          </button>
        </motion.div>
    </div>
  );
};

export default Hello;
