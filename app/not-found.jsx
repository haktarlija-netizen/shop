"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
          className="h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden"
    >
      <h1 className="text-9xl font-bold text-pink-500 drop-shadow-[0_0_20px_rgba(255,0,255,0.8)]">
        404
      </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-fuchsia-600 to-purple-700 opacity-40 animate-pulse blur-3xl"></div>

      {/* Floating Neon Orbs */}
      <div className="absolute top-16 left-24 w-44 h-44 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl animate-bounce"></div>
      <div className="absolute bottom-24 right-24 w-60 h-60 bg-blue-400 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>

      {/* Glowing 404 Text */}

      <p className="mt-4 text-2xl text-gray-300 drop-shadow-md">
        Sorry, the page you’re looking for doesn’t exist 💡
      </p>

      {/* Home Button */}
      <Link
        href="/"
        className="mt-8 px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-bold shadow-[0_0_25px_rgba(255,0,255,0.8)] hover:scale-110 transition-transform"
      >
        🔙 Go Home
      </Link>
    </motion.div>
  );
}
