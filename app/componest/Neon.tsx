// "use client";
// import { motion } from "framer-motion";

// export default function NeonCard({ title, description }) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.05, boxShadow: '0 0 20px #00ffff, 0 0 40px #ff00ff' }}
//       className="p-6 rounded-2xl bg-gradient-to-r from-neonPink to-neonBlue shadow-neon text-center m-4"
//     >
//       <h2 className="text-2xl font-bold mb-2">{title}</h2>
//       <p className="text-sm">{description}</p>
//     </motion.div>
//   );
// }



"use client";
import { motion } from "framer-motion";

export default function NeonCard({ title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px #00ffff, 0 0 40px #ff00ff' }}
      className="p-6 rounded-2xl bg-gradient-to-r from-neonPink to-neonBlue shadow-neon text-center m-4"
    >
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-sm">{description}</p>
    </motion.div>
  );
}

