



'use client'

// import { useEffect, useState } from "react";
// import { signIn } from "next-auth/react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// import Api from "../api/Api";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function AuthPage() {
//   const router = useRouter();

//   const [isLogin, setIsLogin] = useState(true);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [policestation, setPolicStation] = useState("");
//   const [phone, setPhone] = useState("");
//   const [unid, setUniid] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setUniid(Math.floor(10000000 + Math.random() * 90000000));
//   }, []);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     if (isLogin) {
//       try {
//         const res = await Api.post("/users_login", { email, password });

//         if (!res.data.user || res.data.user === 201) {
//           toast.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়");
//         } else {
//           localStorage.setItem("userData", JSON.stringify(res.data.user[0]));
//           toast.success("লগইন সফল হয়েছে!");
//           router.push("/");
//         }
//       } catch (err) {
//         toast.error("সার্ভার সমস্যা বা ভুল তথ্য");
//       }
//     } else {
//       try {
//         const res = await Api.post("/add_user", {
//           name,
//           pass: password,
//           address: policestation,
//           email,
//           phone,
//           img: "logo_user.jpg",
//           unicid: unid,
//         });

//         if (res.data.message === true) {
//           toast.success("রেজিস্ট্রেশন সফল! এখন লগইন করুন");
//           setIsLogin(true);
//         } else {
//           toast.error(res.data.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
//         }
//       } catch (err) {
//         toast.error("রেজিস্ট্রেশন ব্যর্থ হয়েছে");
//       }
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center p-4">
//       {/* Free Account Badge */}
//       <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
//         <div className="bg-green-600 text-white px-6 py-2 rounded-full shadow-lg text-lg font-bold animate-bounce">
//           🎁 ফ্রি একাউন্ট
//         </div>
//       </div>

//       <motion.div
//         className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
//         initial={{ opacity: 0, y: 100 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
//           {isLogin ? "Login to Your Account" : "Create a New Account"}
//         </h2>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {!isLogin && (
//             <>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="আপনার নাম"
//                 required
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <input
//                 type="text"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 placeholder="আপনার মোবাইল নং"
//                 required
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <input
//                 type="text"
//                 value={policestation}
//                 onChange={(e) => setPolicStation(e.target.value)}
//                 placeholder="আপনার গ্রাম/শহর + থানা + জেলা"
//                 required
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </>
//           )}

//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="ইমেইল"
//             required
//             className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="পাসওয়ার্ড"
//             required
//             className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex items-center justify-center bg-blue-600 text-white p-2 rounded-lg font-semibold transition duration-300 hover:bg-blue-700 disabled:opacity-60"
//           >
//             {loading
//               ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               : isLogin ? "লগইন করুন" : "রেজিস্টার করুন"}
//           </button>
//         </form>

//         <div className="text-center text-sm text-gray-500 my-4">
//           {isLogin ? (
//             <>
//               অ্যাকাউন্ট নেই?{" "}
//               <button onClick={() => setIsLogin(false)} className="text-blue-500 hover:underline">
//                 রেজিস্টার করুন
//               </button>
//             </>
//           ) : (
//             <>
//               ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
//               <button onClick={() => setIsLogin(true)} className="text-blue-500 hover:underline">
//                 লগইন করুন
//               </button>
//             </>
//           )}
//         </div>

//         <div className="my-4 text-center text-gray-400">অথবা লগইন করুন</div>

//         <div className="flex flex-col gap-3">
//           <button
//             onClick={() => signIn("google")}
//             className="w-full bg-white border border-gray-300 text-black py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
//           >
//             Google দিয়ে লগইন করুন
//           </button>

//           <button
//             onClick={() => signIn("facebook")}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
//           >
//             Facebook দিয়ে লগইন করুন
//           </button>

//           {isLogin && !loading && (
//             <Link href="/forgetpassword" className="text-center text-blue-500 hover:underline">
//               পাসওয়ার্ড ভুলে গেছি ?
//             </Link>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// }









import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Cyberpunk Marketplace Page
// Tailwind + Framer Motion


import { User, LogIn, LogOut, Coins } from "lucide-react";


export default function MarketplacePage() {

  
const [open, setOpen] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [coins, setCoins] = useState(1250);


  const [tab, setTab] = useState("new");
  const [query, setQuery] = useState("");

  const newProducts = [
    { id: 1, title: "Neon Headphones", price: "৳2,300", tag: "Electronics" },
    { id: 2, title: "Eco Bottle", price: "৳450", tag: "Lifestyle" },
    { id: 3, title: "Smart Lamp", price: "৳1,200", tag: "Home" },
    { id: 4, title: "Running Shoes", price: "৳3,400", tag: "Fashion" },
  ];

  const oldProducts = [
    { id: 11, title: "Vintage Camera", price: "৳4,800", tag: "Collectible" },
    { id: 12, title: "Classic Watch", price: "৳2,100", tag: "Accessory" },
    { id: 13, title: "Wooden Chair", price: "৳1,600", tag: "Home" },
  ];

  const services = [
    { id: 21, title: "App Development", desc: "Next.js + Laravel API integration" },
    { id: 22, title: "UI/UX Design", desc: "Mobile-first beautiful interfaces" },
    { id: 23, title: "SEO Audit", desc: "On-page + Technical SEO in Bangla/EN" },
  ];

  const allItems = useMemo(() => {
    if (tab === "new") return newProducts;
    if (tab === "old") return oldProducts;
    return services;
  }, [tab]);

  const filtered = allItems.filter((it) =>
    (it.title + (it.tag || "") + (it.desc || ""))
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#050206] via-[#070617] to-[#02020a] text-gray-100">
      {/* Animated Background Layers */}
      <BackgroundLayers />

      <div className="relative z-20 max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-neon">R</div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight neon-text">সাইবারপাংক মার্কেটপ্লেস</h1>
              <p className="text-sm text-gray-300 mt-1">Neon, Grid, Waves & Floating Particles — Mobile & PC responsive</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="পণ্যের খোঁজ..."
              className="flex-1 sm:flex-none sm:w-64 px-4 py-2 rounded-lg bg-[#0b0b12] border border-[#222233] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-100"
            />
            <button className="neon-3d-btn">Search</button>
          </div>
        </header>










{/* Navbar */}
<div className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-lg border-b border-cyan-500/30 flex items-center justify-between px-6 py-3 shadow-[0_0_15px_rgba(0,255,255,0.5)]">
<h1 className="text-xl font-bold text-cyan-400 drop-shadow-[0_0_10px_#0ff]">⚡ NeonShop</h1>


{/* Profile */}
<div className="relative">
<motion.img
src="https://i.pravatar.cc/40"
alt="profile"
className="w-10 h-10 rounded-full border-2 border-cyan-400 cursor-pointer shadow-[0_0_10px_#0ff]"
whileHover={{ scale: 1.1 }}
onClick={() => setOpen(!open)}
/>


{open && (
<motion.div
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -10 }}
className="absolute right-0 mt-3 w-56 bg-black/90 border border-cyan-400 rounded-xl shadow-lg p-4 z-50 backdrop-blur-md"
>
<div className="flex items-center gap-2 mb-4">
<User className="text-cyan-400" />
<span className="text-white">{isLoggedIn ? "User Name" : "Guest"}</span>
</div>


<div className="flex items-center gap-2 mb-4">
<Coins className="text-yellow-400" />
<motion.span
key={coins}
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
className="text-yellow-300 font-bold"
>
{coins} Coins
</motion.span>
</div>


{isLoggedIn ? (
<button
onClick={() => setIsLoggedIn(false)}
className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg bg-red-600/20 border border-red-400 hover:bg-red-600/30 text-red-400"
>
<LogOut size={18} /> Logout
</button>
) : (
<button
onClick={() => setIsLoggedIn(true)}
className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg bg-green-600/20 border border-green-400 hover:bg-green-600/30 text-green-400"
>
<LogIn size={18} /> Login
</button>
)}
</motion.div>
)}
</div>
</div>
















        {/* Tabs */}
        <nav className="bg-[#07071a]/60 backdrop-blur rounded-xl p-2 flex gap-2 shadow-lg mb-6 overflow-x-auto">
          {[
            { key: "new", label: "নতুন পণ্য" },
            { key: "old", label: "পুরাতন পণ্য" },
            { key: "services", label: "অন্যা-অন্যা সার্ভিস" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setQuery(""); }}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium neon-tab ${tab === t.key ? 'active' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-pink-300">{tab === 'new' ? 'নতুন পণ্য' : tab === 'old' ? 'পুরাতন পণ্য' : 'সার্ভিসসমূহ'}</h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              {filtered.length === 0 ? (
                <div className="py-16 text-center text-gray-500">কোনো আইটেম মিললো না।</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((item) => (
                    <Card key={item.id} item={item} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Footer CTA */}
        <footer className="mt-10">
          <div className="bg-gradient-to-r from-[#ff4da6] via-[#8b5cf6] to-[#3b82f6] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div>
              <h3 className="text-xl font-semibold">আপনার পণ্য/সার্ভিস যোগ করুন</h3>
              <p className="text-sm opacity-90">দ্রুত তালিকাভুক্ত করুন এবং হাজার মানুষের কাছে পৌঁছান।</p>
            </div>
            <div className="flex gap-3">
              <button className="neon-3d-btn">ডেমো দেখুন</button>
              <button className="neon-3d-btn active">তালিকাভুক্ত করুন</button>
            </div>
          </div>
        </footer>
      </div>

      {/* small attribution bottom-right */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-400 z-30">Designed with ❤️ — Cyber Neon</div>

    </div>
  );
}

function Card({ item }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative perspective-1000"
    >
      <motion.div
        initial={{ rotateY: 0 }}
        whileHover={{ rotateY: 8 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        className="bg-[#070713] rounded-2xl p-4 shadow-neon-card border border-[#191925] hover:border-[#e879f9]/40"
      >
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#ff6aa3] to-[#7c3aed] flex items-center justify-center text-white font-semibold shadow-inner">IMG</div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg neon-text">{item.title}</h4>
            {item.tag && <div className="text-xs text-gray-400 mt-1">{item.tag}</div>}
            {item.desc && <p className="text-sm text-gray-300 mt-2">{item.desc}</p>}

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="text-lg font-semibold text-pink-300">{item.price || ''}</div>
              <div className="flex gap-2">
                <button className="neon-3d-btn small">বিস্তারিত</button>
                <button className="neon-3d-btn small">শেয়ার</button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function BackgroundLayers() {
  // create 25 floating particles
  const particles = Array.from({ length: 25 }).map((_, i) => ({ id: i, left: Math.random() * 100, top: Math.random() * 100, size: Math.random() * 6 + 2, delay: Math.random() * 8 }));

  return (
    <>
      {/* animated grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="neon-grid" />
        <div className="neon-waves" />

        {/* particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${p.size}px`, height: `${p.size}px`, animationDelay: `${p.delay}s` }}
          />
        ))}

        {/* moving light streaks */}
        <div className="light-streak light-1" />
        <div className="light-streak light-2" />
      </div>

      <style jsx global>{`
        /* utility for 3D perspective */
        .perspective-1000 { perspective: 1000px; }

        /* neon text */
        .neon-text {
          color: #e9d5ff;
          text-shadow: 0 2px 8px rgba(139,92,246,0.25), 0 0 12px rgba(236,72,153,0.12);
        }

        /* neon shadows */
        .shadow-neon { box-shadow: 0 6px 30px rgba(99,102,241,0.12), 0 0 18px rgba(236,72,153,0.08); }
        .shadow-neon-card { box-shadow: 0 10px 40px rgba(99,102,241,0.06), 0 0 24px rgba(236,72,153,0.06); }
        .shadow-inner { box-shadow: inset 0 -6px 24px rgba(0,0,0,0.4); }

        /* neon 3d button */
        .neon-3d-btn {
          --bg1: #0b0b12;
          --bg2: linear-gradient(90deg,#ff4da6,#8b5cf6,#3b82f6);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.55rem 1rem;
          border-radius: 12px;
          font-weight: 600;
          color: #fff;
          background: var(--bg1);
          border: 1px solid rgba(255,255,255,0.03);
          box-shadow: 0 8px 30px rgba(59,130,246,0.06), 0 0 18px rgba(236,72,153,0.06);
          transform-style: preserve-3d;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .neon-3d-btn.small { padding: 0.35rem 0.7rem; font-size: 0.9rem; }
        .neon-3d-btn:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 18px 50px rgba(139,92,246,0.18), 0 0 32px rgba(236,72,153,0.12); }
        .neon-3d-btn:active { transform: translateY(1px) scale(0.99); box-shadow: 0 6px 20px rgba(0,0,0,0.6) inset; }
        .neon-3d-btn.active { background: linear-gradient(90deg,#ff4da6,#8b5cf6,#3b82f6); color: #fff; }

        /* neon tab */
        .neon-tab { color: #d1d5db; background: transparent; border: 1px solid rgba(255,255,255,0.02); }
        .neon-tab.active { background: linear-gradient(90deg, rgba(248,113,113,0.06), rgba(139,92,246,0.06)); box-shadow: 0 6px 24px rgba(139,92,246,0.06); border-color: rgba(139,92,246,0.18); color: #fff; }

        /* grid */
        .neon-grid {
          position: absolute; inset: 0; z-index: 0; opacity: 0.35; background-image:
            linear-gradient(0deg, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          transform: translateZ(0);
          animation: gridMove 20s linear infinite;
          mix-blend-mode: overlay;
          filter: hue-rotate(30deg) saturate(120%);
        }
        @keyframes gridMove { from { background-position: 0 0; } to { background-position: 400px 400px; } }

        /* waves */
        .neon-waves {
          position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden;
          background: radial-gradient(600px 200px at 10% 20%, rgba(255,77,166,0.06), transparent 20%),
                      radial-gradient(800px 250px at 90% 80%, rgba(139,92,246,0.05), transparent 20%);
        }

        /* particles */
        .particle { position: absolute; z-index: 0; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0.2)); box-shadow: 0 0 12px rgba(255,255,255,0.06); animation: floatUp 8s linear infinite; opacity: 0.9; }
        @keyframes floatUp { 0% { transform: translateY(10px) scale(0.9); opacity: 0.2; } 50% { opacity: 1; } 100% { transform: translateY(-20px) scale(1); opacity: 0.2; } }

        /* moving streaks */
        .light-streak { position: absolute; z-index: 0; width: 140%; height: 120px; left: -20%; top: 10%; opacity: 0.06; filter: blur(30px); transform: rotate(-12deg); pointer-events: none; }
        .light-streak.light-1 { background: linear-gradient(90deg, transparent, rgba(255,77,166,0.6), transparent); animation: streak1 12s linear infinite; }
        .light-streak.light-2 { background: linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent); top: 60%; animation: streak2 16s linear infinite; }
        @keyframes streak1 { 0% { transform: translateX(-100%) rotate(-12deg); } 100% { transform: translateX(100%) rotate(-12deg); } }
        @keyframes streak2 { 0% { transform: translateX(100%) rotate(-6deg); } 100% { transform: translateX(-100%) rotate(-6deg); } }

        /* responsive tweaks for particles */
        @media (max-width: 640px) { .neon-grid { opacity: 0.18 } .particle { display: none } }
      `}</style>
    </>
  );
}













// 'use client'

// import { useEffect, useState } from "react";
// import { signIn } from "next-auth/react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// import Api from "./../api/Api";
// import Link from "next/link";


// export default function AuthPage() {

 


//   const [isLogin, setIsLogin] = useState(true); // Toggle login/register
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [policestation, setPolicStation] = useState("");
//   const [phone, setphone] = useState("");
//   const [unid, setUniid] = useState("");
//   const [userRefrar, setRefersID] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (isLogin) {
//       // ✅ Login Request
//       try {
//         const res = await Api.post("/users_login", { email, password });

//         if (res.data.user === 201 || res.data.user === null) {
//           toast.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়");
//         } else {
//           const selectedItems = res.data.user.slice(0, 3).map((item) => ({
//             id: item.id,
//             name: item.name,
//             img: item.img,
//             unid: item.uniqid,
//           }));
//           localStorage.setItem("userData", JSON.stringify(selectedItems));
//           toast.success("লগইন সফল হয়েছে!");
//           window.location.href = "/";
//         }
//       } catch (err) {
//         toast.error("সার্ভার সমস্যা বা ভুল তথ্য");
//       }
//     } else {
//       // ✅ Register Request
//       try {
//         const res = await Api.post("/add_user", {
//   name:name,
//   pass:password,
//   address:policestation,
//   email:email,
//   phone:phone,
//   img:'logo_user.jpg',
//   unicid:unid,

//         });


//       console.log('server ====================================');
//       console.log(res.data.message);

//       console.log('====================================');

//         if (res.data.message === true) {
//           toast.success("রেজিস্ট্রেশন সফল! এখন লগইন করুন");
       
//         } else {
//           toast.error(res.data.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
//         }
//       } catch (err) {
//         toast.error("রেজিস্ট্রেশন ব্যর্থ হয়েছে");
//       }
//     }

//     setLoading(false);
//   };

 


//   useEffect(() => {

//  const number = Math.floor(10000000 + Math.random() * 90000000);
//     console.log("Random 8-digit number:", number);

// setUniid(number);
 



//   }, [])

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center p-4">
     
     
//             {/* 🎁 Free Account Badge */}
//       <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
//         <div className="bg-green-600 text-white px-6 py-2 rounded-full shadow-lg text-lg font-bold animate-bounce">
//           🎁 ফ্রি একাউন্ট 
//         </div>
//       </div>
      
     
     
     
     
//       <motion.div
//         className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
//         initial={{ opacity: 0, y: 100 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
//           {isLogin ? "Login to Your Account" : "Create a New Account"}
//         </h2>

//         <form className="space-y-4" onSubmit={handleSubmit}>

//           {!isLogin && (
// <>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="আপনার নাম"
//               required
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
        
//           <input
//             type="text"
//             value={phone}
//             onChange={(e) => setphone(e.target.value)}
//             placeholder="আপনার মোবাইল নং "
//             required
//             className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />


//          <input
//             type="text"
//             value={policestation}
//             onChange={(e) => setPolicStation(e.target.value)}
//             placeholder="আপনার গ্রাম/শহর + থানা +  জেলা "
//             required
//             className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />



// </>

//   )}

//          <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="ইমেইল"
//             required
//             className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

          
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="পাসওয়ার্ড"
//             required
//             className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex items-center justify-center bg-blue-600 text-white p-2 rounded-lg font-semibold transition duration-300 hover:bg-blue-700 disabled:opacity-60"
//           >
//             {loading ? (
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             ) : isLogin ? "লগইন করুন   " : "রেজিস্টার করুন"}
//           </button>
//         </form>

//         <div className="text-center text-sm text-gray-500 my-4">
//           {isLogin ? (
//             <>
//               অ্যাকাউন্ট নেই?{" "}
//               <button
//                 onClick={() => setIsLogin(false)}
//                 className="text-blue-500 hover:underline"
//               >
//                 রেজিস্টার করুন
//               </button>
//             </>
//           ) : (
//             <>
//               ইতোমধ্যে অ্যাকাউন্ট আছে?{" "}
//               <button
//                 onClick={() => setIsLogin(true)}
//                 className="text-blue-500 hover:underline"
//               >
//                 লগইন করুন
//               </button>
//             </>
//           )}
//         </div>

//         <div className="my-4 text-center text-gray-400">অথবা লগইন করুন</div>

//         <div className="flex flex-col gap-3">
//           <button
//             onClick={() => signIn("google")}
//             className="w-full bg-white border border-gray-300 text-black py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 48 48">
//               <path fill="#FFC107" d="M43.6 20.4h-2v-.1H24v7.3h11.3C33.7 32.3 29.4 35.4 24 35.4c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.5-5.5C33.7 6.1 29.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.7-.4-3.6z"/>
//               <path fill="#FF3D00" d="M6.3 14.6l6 4.4c1.6-3.1 4.6-5.6 8.1-6.5V6.3C14 7.5 9.1 10.6 6.3 14.6z"/>
//               <path fill="#4CAF50" d="M24 44c5.4 0 10.4-2.1 14.1-5.4l-6.5-5.3c-2 1.5-4.5 2.5-7.6 2.5-5.3 0-9.8-3.6-11.4-8.4l-6.6 5.1C9 39.8 16.1 44 24 44z"/>
//               <path fill="#1976D2" d="M43.6 20.4H24v7.3h11.3c-1.1 2.9-3.3 5.2-6.2 6.5l6.5 5.3c3.8-3.5 6-8.7 6-14.6 0-1.3-.1-2.7-.4-3.6z"/>
//             </svg>
//             Google দিয়ে লগইন করুন
//           </button>

//           <button
//             onClick={() => signIn("facebook")}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
//               <path fill="#1877F2" d="M24 4C12.95 4 4 12.95 4 24c0 10 7.3 18.3 17 19.8v-14h-5v-6h5v-4.6c0-5 3-7.8 7.6-7.8 2.2 0 4.5.4 4.5.4v5h-2.5c-2.5 0-3.3 1.6-3.3 3.3V23h5.6l-.9 6h-4.7v14C36.7 42.3 44 34 44 24c0-11.05-8.95-20-20-20z"/>
//               <path fill="#FFF" d="M31 29l1-6h-5v-3.3c0-1.7.8-3.3 3.3-3.3H33v-5s-2.3-.4-4.5-.4c-4.6 0-7.6 2.8-7.6 7.8V23h-5v6h5v14h6V29h4.7z"/>
//             </svg>
//             Facebook দিয়ে লগইন করুন
//           </button>



//   {loading ? (
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             ) : isLogin ? <Link href={'/forgetpassword' }>পাসওয়ার্ড ভুলে গেছি ?</Link> :   null }

//         </div>
//       </motion.div>
//     </div>
//   );
// }






// 'use client'

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { motion } from "framer-motion";
// import toast from "react-hot-toast";
// import Api from "../../api/Api";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSuccess = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await Api.post("/users_login", { email, password });

//       if (res.data.user === 201 || res.data.user === null) {
//         toast.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়");
//       } else {
//         const selectedItems = res.data.user.slice(0, 3).map((item) => ({
//           id: item.id,
//           name: item.name,
//           img: item.img,
//           unid: item.uniqid,
//         }));

//         localStorage.setItem("userData", JSON.stringify(selectedItems));
//         toast.success("আপনাকে স্বাগত লগইন করার জন্য");
//         window.location.href = "/";
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       toast.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center p-4">
//         <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
//         <div className="bg-green-600 text-white px-6 py-2 rounded-full shadow-lg text-lg font-bold animate-bounce">
//           🎁 ফ্রি একাউন্ট
//         </div>
//       </div>

//       <motion.div   
//         className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
//         initial={{ opacity: 0, y: 100 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
//           Login to Your Account
//         </h2>

//         <form className="space-y-4" onSubmit={handleSuccess}>
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="ইমেইল অথবা ফোন নম্বর"
//             required
//             className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="পাসওয়ার্ড"
//             required
//             className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex items-center justify-center bg-blue-600 text-white p-2 rounded-lg font-semibold transition duration-300 hover:bg-blue-700 disabled:opacity-60"
//           >
//             {loading ? (
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             ) : (
//               "লগইন করুন"
//             )}
//           </button>
//         </form>

//         <div className="my-4 text-center text-gray-400">অথবা লগইন করুন</div>

//         <div className="flex flex-col gap-3">
//           <button
//             onClick={() => signIn("google")}
//             className="w-full bg-white border border-gray-300 text-black py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" width="20" height="20" viewBox="0 0 48 48">
//               <path fill="#FFC107" d="M43.6 20.4h-2v-.1H24v7.3h11.3C33.7 32.3 29.4 35.4 24 35.4c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.5-5.5C33.7 6.1 29.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.7-.4-3.6z"/>
//               <path fill="#FF3D00" d="M6.3 14.6l6 4.4c1.6-3.1 4.6-5.6 8.1-6.5V6.3C14 7.5 9.1 10.6 6.3 14.6z"/>
//               <path fill="#4CAF50" d="M24 44c5.4 0 10.4-2.1 14.1-5.4l-6.5-5.3c-2 1.5-4.5 2.5-7.6 2.5-5.3 0-9.8-3.6-11.4-8.4l-6.6 5.1C9 39.8 16.1 44 24 44z"/>
//               <path fill="#1976D2" d="M43.6 20.4H24v7.3h11.3c-1.1 2.9-3.3 5.2-6.2 6.5l6.5 5.3c3.8-3.5 6-8.7 6-14.6 0-1.3-.1-2.7-.4-3.6z"/>
//             </svg>
//             Google দিয়ে লগইন করুন
//           </button>

//           <button
//             onClick={() => signIn("facebook")}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20" className="w-5 h-5">
//               <path fill="#1877F2" d="M24 4C12.95 4 4 12.95 4 24c0 10 7.3 18.3 17 19.8v-14h-5v-6h5v-4.6c0-5 3-7.8 7.6-7.8 2.2 0 4.5.4 4.5.4v5h-2.5c-2.5 0-3.3 1.6-3.3 3.3V23h5.6l-.9 6h-4.7v14C36.7 42.3 44 34 44 24c0-11.05-8.95-20-20-20z"/>
//               <path fill="#FFF" d="M31 29l1-6h-5v-3.3c0-1.7.8-3.3 3.3-3.3H33v-5s-2.3-.4-4.5-.4c-4.6 0-7.6 2.8-7.6 7.8V23h-5v6h5v14h6V29h4.7z"/>
//             </svg>
//             Facebook দিয়ে লগইন করুন
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }



//  'use client' 
// import { signIn } from "next-auth/react";
// import { motion } from "framer-motion";


// import toast from 'react-hot-toast';

// import Api from "../api/Api";
// import { useState } from "react";

// export default function LoginPage() {



//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");



//     const [loading, setLoading] = useState(false);











//     const handleSuccess = async () => {
//     setLoading(true); // Spi




//   Api.post("/users_login", {
//       email: email,
//       password: password,
//     })
//     .then((res) => {
//       console.log("Login success:", res.data.user);
      

//       // Token সেভ করুন
//       // localStorage.setItem("token", response.data.token);

//       // // Dashboard এ redirect
//        window.location.href = "/";
//       if(res.data.user==201){
// console.log('====================================');

// toast.error('ইমেইল বা পাসওয়ার্ড সঠিক নয়');


// console.log('pass or email woring');



// console.log('====================================');
//       }else{





//          // ✅ প্রথম ৩টি item নিয়ে, শুধু id, title, image রাখি
//         const selectedItems = res.data.user.slice(0, 3).map(item => ({
//           id: item.id,
//           name: item.name,   // যদি আপনার API তে `name` থাকে, সেটি নিন
//           img: item.img,
//           unid:item.uniqid
//         }));

//         // ✅ localStorage-এ সেট করুন
//         localStorage.setItem("userData", JSON.stringify(selectedItems));
        



// toast.success('আপনাকে স্বাগত লগইন করার জন্য ');
//       }
      
    
//     })
//     .catch((error) => {
//       console.error("Login failed:", error);
//       setError("ইমেইল বা পাসওয়ার্ড সঠিক নয়");


// toast.error('ইমেইল বা পাসওয়ার্ড সঠিক নয়');


//     })

//  .finally(() => {
//       setLoading(false); // Spinner বন্ধ
//     });



//   };




      



// //     const handleSuccess = () => {

// // Api.post('/users_login',)
// // .then{(res)=>{
// //   console.log('====================================');
// //   console.log(res.data);
// //   console.log('====================================');
// // }}


// //     toast.success('Item added successfully!');
// //   };
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center p-4">

 
//          {/* 🎁 Free Account Badge */}
//       <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
//         <div className="bg-green-600 text-white px-6 py-2 rounded-full shadow-lg text-lg font-bold animate-bounce">
//           🎁 ফ্রি একাউন্ট
//         </div>
//       </div>
      
      
//       <motion.div
//         className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md"
//         initial={{ opacity: 0, y: 100 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Login to Your Account</h2>

//         {/* Email Login - Optional */}
//         <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
//           <input
//             type="email or phone "
//             value={email}
//           onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email Or Phone"
//             className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//                value={password}
//           onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             onClick={handleSuccess}
//             className="w-full flex items-center justify-center bg-blue-600 text-white p-2 rounded disabled:opacity-60 rounded-lg font-semibold transition duration-300"
//              disabled={loading}

                    
//         >
//           {loading ? (
//             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//           ) : (
//             "Login"
//           )}
            
//           </button>
//         </form>

//         <div className="my-4 text-center text-gray-400">or continue with</div>

//         {/* Social Logins */}
//         <div className="flex flex-col gap-3">
//           <button
//             onClick={() => signIn("google")}
//             className="w-full bg-white border border-gray-300 text-black py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
//           >
        
// <svg xmlns="http://www.w3.org/2000/svg"  className="w-5 h-5" width="20" height="20" viewBox="0 0 48 48">
//   <path fill="#FFC107" d="M43.6 20.4h-2v-.1H24v7.3h11.3C33.7 32.3 29.4 35.4 24 35.4c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.5-5.5C33.7 6.1 29.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.7-.4-3.6z"/>
//   <path fill="#FF3D00" d="M6.3 14.6l6 4.4c1.6-3.1 4.6-5.6 8.1-6.5V6.3C14 7.5 9.1 10.6 6.3 14.6z"/>
//   <path fill="#4CAF50" d="M24 44c5.4 0 10.4-2.1 14.1-5.4l-6.5-5.3c-2 1.5-4.5 2.5-7.6 2.5-5.3 0-9.8-3.6-11.4-8.4l-6.6 5.1C9 39.8 16.1 44 24 44z"/>
//   <path fill="#1976D2" d="M43.6 20.4H24v7.3h11.3c-1.1 2.9-3.3 5.2-6.2 6.5l6.5 5.3c3.8-3.5 6-8.7 6-14.6 0-1.3-.1-2.7-.4-3.6z"/>
// </svg>

           
//             Sign in with Google
//           </button>

//           <button
//             onClick={() => signIn("facebook")}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
//           >
     
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20"   className="w-5 h-5">
//   <path fill="#1877F2" d="M24 4C12.95 4 4 12.95 4 24c0 10 7.3 18.3 17 19.8v-14h-5v-6h5v-4.6c0-5 3-7.8 7.6-7.8 2.2 0 4.5.4 4.5.4v5h-2.5c-2.5 0-3.3 1.6-3.3 3.3V23h5.6l-.9 6h-4.7v14C36.7 42.3 44 34 44 24c0-11.05-8.95-20-20-20z"/>
//   <path fill="#FFF" d="M31 29l1-6h-5v-3.3c0-1.7.8-3.3 3.3-3.3H33v-5s-2.3-.4-4.5-.4c-4.6 0-7.6 2.8-7.6 7.8V23h-5v6h5v14h6V29h4.7z"/>
// </svg>

          
//             Sign in with Facebook
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
