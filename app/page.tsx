


"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black">
      {/* Topbar */}
      <div className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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
            <span className="ml-2 hidden sm:inline-flex text-sm px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded">Home</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
              <input
                className="pl-9 w-[300px] py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="খুঁজুন— প্রোডাক্ট, অ্যাপ, মার্কেট…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800" onClick={() => setDark((d) => !d)}>
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
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




