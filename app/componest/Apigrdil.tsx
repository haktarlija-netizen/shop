"use client";
import NeonCard from "./Neon";
import { motion } from "framer-motion";

export default function AppGrid() {
  const apps = [
    { title: "Music Player", description: "Play your favorite tracks" },
    { title: "Chat App", description: "Real-time messaging" },
    { title: "Crypto Wallet", description: "Track your coins" },
    { title: "Game Hub", description: "Fun 3D games" },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {apps.map((app, index) => (
        <NeonCard key={index} {...app} />
      ))}
    </motion.div>
  );
}

