


"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence,  } from "framer-motion";
import {
  Home,
  LineChart as LineIcon,
  ShoppingBag,
  Sparkles,
  Sun,
  Moon,
  Search,
  ChevronRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Star,
  Flame,
   LogIn, LogOut 
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Image from "next/image";
import { redirect } from "next/navigation";






// Demo data
const marketData = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  price: 100 + Math.sin(i / 2) * 8 + (i % 5),
}));

const tickers = [
  { symbol: "RCN", name: "R Coin", price: 12.45, change: +2.3 },
  { symbol: "BANGLA", name: "Bangla Index", price: 245.7, change: -0.8 },
  { symbol: "TECHA", name: "Tech A", price: 78.12, change: +1.1 },
  { symbol: "FOODA", name: "Food A", price: 33.6, change: +0.4 },
];

const categories = [
  { key: "all", label: "সব" },
  { key: "new", label: "নতুন" },
  { key: "old", label: "পুরাতন" },
  { key: "electronics", label: "ইলেকট্রনিক্স" },
  { key: "fashion", label: "ফ্যাশন" },
  { key: "home", label: "হোম" },
];

const allProducts = [
  {
    id: 1,
    title: "স্মার্ট ঘড়ি Pro X",
    tag: "new",
    category: "electronics",
    price: 4990,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1518444054149-4e1cd2f2b4d9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "স্টাইলিশ ব্যাকপ্যাক",
    tag: "new",
    category: "fashion",
    price: 1890,
    rating: 4.6,
    img: "https://images.unsplash.com/photo-1514477917009-389c76a86b68?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "কফি মেকার Classic",
    tag: "old",
    category: "home",
    price: 3290,
    rating: 4.4,
    img: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "ওয়্যারলেস ইয়ারবাড",
    tag: "new",
    category: "electronics",
    price: 2590,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1518441798251-b4c8347d9a26?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "ব্লেজার Premium",
    tag: "old",
    category: "fashion",
    price: 5490,
    rating: 4.3,
    img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
  },
];

// Fade animation helper
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function HomeShowcasePage() {




  const [cojns, setCoins]=useState('0');
  const [dark, setDark] = useState(false);
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState("all");

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const byCat = activeCat === "all" ? true : p.category === activeCat || p.tag === activeCat;
      const byQ = q ? p.title.toLowerCase().includes(q.toLowerCase()) : true;
      return byCat && byQ;
    });
  }, [activeCat, q]);










 
  const [showProfileMenu, setShowProfileMenu] = useState(false);














const  hander_redires=(id: string)=>{
if(id=='Login'){

redirect('/Login');
}else{

alert('logout');
}
}

useEffect(() => {



    
 const userData = localStorage.getItem('coin');
    if (userData) {
      setCoins(userData|| '000.00  ');
      
    }



}, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black">
      {/* Topbar */}
      
       <div className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Side */}
        <div className="flex items-center gap-2">
          <motion.div
            className="h-9 w-9 rounded-2xl bg-blue-100 flex items-center justify-center"
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <Sparkles className="h-5 w-5 text-blue-600" />
          </motion.div>
          <span className="font-bold tracking-tight text-lg">Rashidul Hub</span>
          <span className="ml-2 hidden sm:inline-flex text-sm px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded">
            Home
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
            <input
              className="pl-9 w-[300px] py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="খুঁজুন— প্রোডাক্ট, অ্যাপ, মার্কেট…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          {cojns}

          {/* Dark Mode Toggle */}
          <button
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => setDark((d) => !d)}
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Profile Image */}
          <div className="relative">
            <Image
              src="https://i.pravatar.cc/100"
              alt="profile"
              width={36}
              height={36}
              className="rounded-full cursor-pointer border border-gray-300"
              onClick={() => setShowProfileMenu((prev) => !prev)}
            />

            {/* Profile Popup */}
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-2"
                >
                  <button onClick={()=>hander_redires('Login')}  className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <LogIn size={16}  /> Login
                  </button>
                  <button onClick={()=>hander_redires('logout')} className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <LogOut size={16}   /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>


      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center px-2 py-1 mb-3 text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-800 rounded">
              <Sparkles className="h-3.5 w-3.5 mr-1" /> নতুন আর সুন্দর ডিজাইন
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              এক পেজেই দেখুন <span className="text-blue-600">মার্কেট</span>, প্রোডাক্ট, ও আরও অ্যাপ
            </h1>
            <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-prose">
              লাইট/ডার্ক থিম, স্মুথ মশন, লাইভ স্টাইল চার্ট— সব একসাথে। নিচে স্ক্রল করে এক্সপ্লোর করুন।
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                <Home className="h-4 w-4" /> শুরু করুন
              </button>
              <button className="flex items-center gap-1 px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                <ChevronRight className="h-4 w-4" /> সব ক্যাটাগরি
              </button>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="relative">
            <div className="absolute -inset-4 bg-blue-100 blur-3xl rounded-full -z-10 dark:bg-blue-900/30" />
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex items-center gap-2 font-semibold">
                  <LineIcon className="h-5 w-5" /> লাইভ মার্কেট স্ন্যাপশট
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">ডেমো ডাটা — আপনার API যুক্ত করুন</div>
              </div>
              <div className="p-4">
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={marketData} margin={{ left: 8, right: 8 }}>
                      <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="currentColor" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" hide />
                      <YAxis hide domain={[80, 120]} />
                      <Tooltip contentStyle={{ borderRadius: 12 }} />
                      <Area type="monotone" dataKey="price" strokeWidth={2} stroke="currentColor" fill="url(#g1)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {tickers.map((t) => (
                    <motion.div
                      key={t.symbol}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "rounded-xl border p-2 text-sm flex items-center justify-between",
                        t.change >= 0 ? "bg-green-50 dark:bg-green-900/30" : "bg-red-50 dark:bg-red-900/30"
                      )}
                    >
                      <div>
                        <div className="font-medium">{t.symbol}</div>
                        <div className="text-gray-500 text-xs">{t.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{t.price.toFixed(2)}</div>
                        <div className={cn("text-xs", t.change >= 0 ? "text-green-600" : "text-red-600")}>{t.change}%</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Apps & Products & CTA & Footer */}
      {/* Tailwind only components like above */}
      {/* Product Grid, Quick Apps, Tabs, CTA banner, Footer all TailwindCSS styled */}
    </div>
  );
}





// "use client";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Stage, Html, useGLTF } from "@react-three/drei";

// // Load 3D model
// function ProductModel({ modelPath }) {
//   const { scene } = useGLTF(modelPath);
//   return <primitive object={scene} scale={1.5} />;
// }

// export default function Product3D({ modelPath, title, price }) {
//   return (
//     <div className="w-full md:w-80 h-96 p-4 bg-gradient-to-r from-neonPink to-neonBlue rounded-2xl shadow-neon m-4">
//       <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[5, 5, 5]} intensity={1} />
//         <Stage environment="city" intensity={0.6}>
//           <ProductModel modelPath={modelPath} />
//         </Stage>
//         <OrbitControls enablePan={true} enableZoom={true} />
//       </Canvas>

//       {/* Product Info */}
//       <div className="mt-4 text-center text-white">
//         <h2 className="text-xl font-bold">{title}</h2>
//         <p className="text-lg font-semibold text-neonBlue">${price}</p>
//       </div>
//     </div>
//   );
// }



// "use client";
// import AppGrid from "./componest/Apigrdil";
// import NeonSphere from "./componest/Shapneon";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-black flex flex-col items-center">
//       <h1 className="text-4xl font-bold mt-8 mb-4 text-neonPink animate-pulse">Neon Dashboard</h1>
//       <NeonSphere />
//       <AppGrid />
//     </div>
//   );
// }






// "use client";
// import NeonCard from "./componest/Neon";
// import { motion } from "framer-motion";

// export default function AppGrid() {
//   const apps = [
//     { title: "Music Player", description: "Play your favorite tracks" },
//     { title: "Chat App", description: "Real-time messaging" },
//     { title: "Crypto Wallet", description: "Track your coins" },
//     { title: "Game Hub", description: "Fun 3D games" },
//   ];

//   return (
//     <motion.div
//       className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//     >
//       {apps.map((app, index) => (
//         <NeonCard key={index} {...app} />
//       ))}
//     </motion.div>
//   );
// }



// "use client";

// import React from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination,  Lazy } from "swiper";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// export default function MultiShowCarousel({ items = [] }) {
//   return (
//     <section className="w-full max-w-7xl mx-auto px-4 py-8">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl sm:text-2xl font-semibold">সকল মাল্টিপল পণ্য</h2>
//         <p className="text-sm text-gray-500">লাজি লোড + স্লাইডার মোড</p>
//       </div>

//       <Swiper
//         modules={[Navigation, Pagination,  Lazy]}
//         spaceBetween={18}
//         slidesPerView={1}
//         breakpoints={{
//           640: { slidesPerView: 2 },
//           768: { slidesPerView: 3 },
//           1024: { slidesPerView: 4 },
//         }}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         lazy={{ loadPrevNext: true, loadOnTransitionStart: true }}
//         loop
//         aria-label="Product Carousel"
//         className="py-2"
//       >
//         {items.length === 0 ? (
//           <>
//             {Array.from({ length: 4 }).map((_, i) => (
//               <SwiperSlide key={i}>
//                 <div className="rounded-2xl bg-white/60 dark:bg-gray-800/60 p-4 shadow-sm flex flex-col gap-3 items-start">
//                   <div className="w-full h-44 rounded-lg bg-gray-200 animate-pulse" />
//                   <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
//                   <div className="w-1/3 h-4 bg-gray-200 rounded animate-pulse" />
//                 </div>
//               </SwiperSlide>
//             ))}
//             <div className="text-center text-gray-500 text-sm py-6">
//               No items found
//             </div>
//           </>
//         ) : (
//           items.map((it) => (
//             <SwiperSlide key={it.id}>
//               <article className="rounded-2xl bg-white dark:bg-gray-900 p-3 shadow-md hover:shadow-xl transition-shadow duration-200">
//                 <div className="relative w-full h-44 rounded-lg overflow-hidden">
//                   <Image
//                     src={it.image}
//                     alt={it.title}
//                     fill
//                     loading="lazy"
//                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
//                     className="object-cover"
//                   />
//                 </div>

//                 <div className="mt-3 flex items-start justify-between gap-3">
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
//                       {it.title}
//                     </h3>
//                     <p className="text-xs text-gray-500 mt-1">{it.subtitle}</p>
//                   </div>

//                   <div className="text-right">
//                     <div className="text-sm font-bold text-indigo-600">
//                       {it.price}
//                     </div>
//                     <div className="text-xs text-gray-400">BDT</div>
//                   </div>
//                 </div>

//                 <div className="mt-3 flex gap-2">
//                   <button className="flex-1 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">
//                     Add
//                   </button>
//                   <button className="py-2 px-3 rounded-lg border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition">
//                     View
//                   </button>
//                 </div>
//               </article>
//             </SwiperSlide>
//           ))
//         )}
//       </Swiper>
//     </section>
//   );
// }

