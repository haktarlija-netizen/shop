"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, TrendingUp, Gamepad2, Gift, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// টাইপস
type Particle = {
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  colorIndex: number;
  shapeIndex: number;
  rotate: number;
  opacity: number;
  parallax: number;
  id: number;
};

type Burst = {
  x: number;
  y: number;
  size: number;
  color: string;
  id: number;
};

export default function AllCategorySection() {
  const [scrollY, setScrollY] = useState(0);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [clickBursts, setClickBursts] = useState<Burst[]>([]);

  // ক্যাটাগরি ডাটা
  const categories = [
    {
      title: "নতুন পণ্য",
      icon: <ShoppingBag size={36} />,
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      color: "from-pink-500 to-purple-600",
      link: "/new-products",
    },
    {
      title: "পুরাতন পণ্য",
      icon: <Layers size={36} />,
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      color: "from-blue-500 to-cyan-500",
      link: "/old-products",
    },
    {
      title: "শেয়ার মার্কেট",
      icon: <TrendingUp size={36} />,
      img: "https://images.unsplash.com/photo-1569025690938-a00729c9e1e8",
      color: "from-green-500 to-emerald-500",
      link: "/share-market",
    },
    {
      title: "গেমস",
      icon: <Gamepad2 size={36} />,
      img: "https://images.unsplash.com/photo-1606813902818-87952c3b42e0",
      color: "from-yellow-500 to-orange-600",
      link: "/games",
    },
    {
      title: "লটারী স্পিন",
      icon: <Gift size={36} />,
      img: "https://images.unsplash.com/photo-1603297631957-4b2c6313f93e",
      color: "from-red-500 to-pink-600",
      link: "/lottery",
    },
    {
      title: "অন্য সেবা",
      icon: <Layers size={36} />,
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      color: "from-indigo-500 to-violet-600",
      link: "/services",
    },
  ];

  const shapes = ["circle", "star", "triangle"];
  const colors = [
    "#FF3CFF",
    "#00FFFF",
    "#FFAA00",
    "#FF0055",
    "#00FFAA",
    "#FF33AA",
    "#33FFAA",
  ];

  // Window resize + scroll
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleScroll = () => setScrollY(window.scrollY);
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if ("touches" in e && e.touches.length > 0) {
        setPointerPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      } else if ("clientX" in e) {
        setPointerPos({ x: e.clientX, y: e.clientY });
      }
    };
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Particles generate (1 বারই হবে)
  const particles = useMemo<Particle[]>(() => {
    return [...Array(25)].map((_, i) => {
      const layerType = i % 3;
      const sizeMap = [5, 3, 1.5];
      const speedMap = [5, 8, 12];
      const opacityMap = [1, 0.6, 0.3];
      const parallaxMap = [15, 8, 4];
      return {
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * sizeMap[layerType] + 1,
        duration: Math.random() * speedMap[layerType] + 2,
        delay: Math.random() * 2,
        colorIndex: Math.floor(Math.random() * colors.length),
        shapeIndex: Math.floor(Math.random() * shapes.length),
        rotate: Math.random() * 360,
        opacity: opacityMap[layerType],
        parallax: parallaxMap[layerType],
        id: i,
      };
    });
  }, []);

  // Burst effect
  const handleClick = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    let x = 0,
      y = 0;
    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else if ("clientX" in e) {
      x = e.clientX;
      y = e.clientY;
    }

    const burstParticles: Burst[] = [...Array(8)].map(() => ({
      x,
      y,
      size: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      id: Math.random(),
    }));

    setClickBursts((prev) => [...prev, ...burstParticles]);
    setTimeout(
      () => setClickBursts((prev) => prev.slice(burstParticles.length)),
      1200
    );
  };

  // Shape render
  const renderShape = (p: Particle, i: number) => {
    const offsetX =
      ((pointerPos.x - windowSize.width / 2) / 50) * p.parallax;
    const offsetY =
      ((pointerPos.y - windowSize.height / 2) / 50) * p.parallax;
    const dynamicColor =
      colors[(p.colorIndex + Math.floor(Date.now() / 200)) % colors.length];
    const dynamicShape =
      shapes[(p.shapeIndex + Math.floor(Date.now() / 1000)) % shapes.length];

    const commonStyle: React.CSSProperties = {
      top: `${p.top}%`,
      left: `${p.left}%`,
      filter: `drop-shadow(0 0 10px ${dynamicColor})`,
      opacity: p.opacity,
      cursor: "grab",
      position: "absolute",
    };

    const animationProps = {
      y: [-5 + scrollY / 50 + offsetY, 5 + scrollY / 50 + offsetY],
      x: [0 + offsetX, Math.random() * 20 - 10 + offsetX, 0 + offsetX],
      rotate: [0, p.rotate, 0],
      opacity: [p.opacity, p.opacity / 2, p.opacity],
    };

    const transitionProps = {
      duration: p.duration,
      repeat: Infinity,
      repeatType: "mirror" as const,
      delay: p.delay,
    };

    switch (dynamicShape) {
      case "circle":
        return (
          <motion.div
            key={i}
            drag
            dragConstraints={{
              top: 0,
              left: 0,
              right: windowSize.width,
              bottom: windowSize.height,
            }}
            style={{
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: dynamicColor,
              ...commonStyle,
            }}
            animate={animationProps}
            transition={transitionProps}
          />
        );
      case "star":
        return (
          <motion.div
            key={i}
            drag
            dragConstraints={{
              top: 0,
              left: 0,
              right: windowSize.width,
              bottom: windowSize.height,
            }}
            style={{
              width: 0,
              height: 0,
              borderLeft: `${p.size}px solid transparent`,
              borderRight: `${p.size}px solid transparent`,
              borderBottom: `${p.size * 2}px solid ${dynamicColor}`,
              ...commonStyle,
            }}
            animate={animationProps}
            transition={transitionProps}
          />
        );
      case "triangle":
        return (
          <motion.div
            key={i}
            drag
            dragConstraints={{
              top: 0,
              left: 0,
              right: windowSize.width,
              bottom: windowSize.height,
            }}
            style={{
              width: 0,
              height: 0,
              borderLeft: `${p.size}px solid transparent`,
              borderRight: `${p.size}px solid transparent`,
              borderTop: `${p.size * 2}px solid ${dynamicColor}`,
              ...commonStyle,
            }}
            animate={animationProps}
            transition={transitionProps}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={handleClick}
      onTouchStart={handleClick}
      className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 grid bg-transparent before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(0deg,#0ff0_0_1px,#0000_1px_20px)] after:content-[''] after:absolute after:inset-0 after:bg-[repeating-linear-gradient(90deg,#0ff0_0_1px,#0000_1px_20px)] animate-[pulse_10s_linear_infinite] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,255,255,0.05)_0_1px,transparent_1px_3px)] animate-[scroll_2s_linear_infinite] pointer-events-none"></div>

      <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 drop-shadow-lg z-10 relative">
        সব ক্যাটাগরি একসাথে
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-7xl z-10 relative">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="relative rounded-3xl shadow-2xl overflow-hidden cursor-pointer group"
          >
            <Image
              src={cat.img}
              alt={cat.title}
              width={500}
              height={300}
              className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-60 group-hover:opacity-80 transition-all duration-500`}
            />

            {/* Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {particles.map((p, i) => renderShape(p, i))}
            </div>

            {/* Burst effect */}
            <AnimatePresence>
              {clickBursts.map((burst) => (
                <motion.div
                  key={burst.id}
                  initial={{ x: burst.x, y: burst.y, opacity: 1, scale: 1 }}
                  animate={{
                    x: burst.x + (Math.random() - 0.5) * 100,
                    y: burst.y + (Math.random() - 0.5) * 100,
                    opacity: 0,
                    scale: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <div
                    style={{
                      width: burst.size,
                      height: burst.size,
                      backgroundColor: burst.color,
                      borderRadius: "50%",
                      filter: `drop-shadow(0 0 6px ${burst.color})`,
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Category Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 space-y-3">
              <div className="drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]">
                {cat.icon}
              </div>
              <h3 className="text-lg md:text-xl font-semibold">{cat.title}</h3>
              <Link href={cat.link}>
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    textShadow: "0 0 15px #fff",
                    boxShadow: "0 0 20px #fff",
                  }}
                  className="mt-2 px-5 py-2 rounded-xl bg-white/10 backdrop-blur-md text-white font-semibold border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.6)] hover:bg-white/20 transition-all duration-300"
                >
                  Explore Now →
                </motion.button>
              </Link>
            </div>
            <div className="absolute inset-0 rounded-3xl border-2 border-white/20 blur-md animate-pulse"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


