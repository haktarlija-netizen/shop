


'use client';

import { useEffect, useState, useRef } from 'react';








import {  AnimatePresence } from "framer-motion";
import { Delete, Menu, Search, ShoppingBag, X } from "lucide-react";
import CountUp from "react-countup";





import { useCartStore } from "../../../../api/Carssotres";


import Cardshop from '../../../../api/SiddbarAddBag'


import { motion } from 'framer-motion';
import Api from '../../../../api/Api';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ShoppingCart, Eye, Star, Share2 } from "lucide-react";
import { strict } from 'assert';


interface Product {
  id: number;
  name: string;
  model: string;
  pricee: number;
  reprice?: number;
  qty: number;
  img?: string;       // <-- যোগ করতে হবে
  imglink?: string;   // <-- যোগ করতে হবে
  rating?: number;
}



export default function CyberNeonParallax({ product }: { product: Product }) {





      const { cart, addToCart, removeFromCart, updateQty, clearCart } = useCartStore();



 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);

  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!sidebarOpen) inputRef.current?.blur();
  }, [sidebarOpen]);











  // const sampleProduct = {
  //   id: 1,
  //   name: "Demo Product",
  //   price: 100,
  //   qty: 1,
  // };



  const [producmenu, setProdumenuget] = useState<any[]>([]);

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loading123, setLoading11] = useState(true);
  const cartRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cartCount, setCartCount] = useState(0);



  const [error, setError] = useState("");

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);














   const [error3, setError2] = useState("");

  const itemsPerPager = 4;
  const [currentPageCard, setCurrentPagecard] = useState(1);
  const totalPagescard = Math.max(1, Math.ceil(cart.length / itemsPerPager));
  const startIndexcard = (currentPageCard - 1) * itemsPerPager;
  const currentItemss = cart.slice(startIndexcard, startIndexcard + itemsPerPager);




  const params = useParams();
  const currentCategory = params?.catagori as string | undefined;
  const barnds = params?.brandname as string | undefined;
  const finalname = params?.finalcatagori as string | undefined;








// ulltarapa. parkul-108, rs, 439, 


    const filteredItems = currentItems.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.pricee.toLowerCase().includes(query.toLowerCase()) ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.model.toLowerCase().includes(query.toLowerCase())
  );








    
   
  // 📡 API Data Load
  useEffect(() => {
    const fetchData2 = async () => {
      if (!currentCategory) return;
      setLoading11(true);
      try {
        const res = await Api.get(`/get_all_product_brandName/${barnds}/${currentCategory}`);
        setProdumenuget(res.data.message);
        console.log(res.data.message);
        console.log('this a get bran name  get menu name list ');
      } catch (err) {
        console.error('❌ Fetch error:', err);
      } finally {
        setLoading11(false);
      }
    };
setInterval(() => {
  

  fetchData2();

}, 3000);
    

    // প্রতি 3 সেকেন্ডে আপডেট চাইলে
    
  }, [currentCategory]);






  // Fetch products
  useEffect(() => {
    const fetchData = async () => {
      if (!currentCategory) return;
      setLoading(true);
      try {
        const res = await Api.get(`/get_all_product_brandName_final/${barnds}/${currentCategory}/${finalname}`);
        setProducts(res.data.message);
      } catch (err) {
        console.error('❌ Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [finalname]);


  // Cursor tracking
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      // Parallax effect
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const offsetX = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const offsetY = (e.clientY - rect.top - rect.height / 2) / rect.height;

        containerRef.current.style.transform = `rotateY(${offsetX * 5}deg) rotateX(${-offsetY * 5}deg)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, Product: any) => {
    const item = e.currentTarget.getBoundingClientRect();
    const bag = cartRef.current?.getBoundingClientRect();
    if (!bag) return;

    const flyingItem = document.createElement("div");
    flyingItem.innerText = "🛒";
    flyingItem.style.position = "fixed";
    flyingItem.style.left = `${item.left}px`;
    flyingItem.style.top = `${item.top}px`;
    flyingItem.style.fontSize = "32px";
    flyingItem.style.zIndex = "9999";
    flyingItem.style.transition = "transform 0.8s ease-in-out";
    document.body.appendChild(flyingItem);

    requestAnimationFrame(() => {
      const dx = bag.left - item.left;
      const dy = bag.top - item.top;
      flyingItem.style.transform = `translate(${dx}px, ${dy}px) scale(0.5) rotate(360deg)`;
    });

    setTimeout(() => {
      flyingItem.remove();
      setCartCount((prev) => prev + 1);

      addToCart(Product);



    }, 800);


    
  };




  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-400">
        Loading products...
      </div>
    );
  }

  return (
    <>





    

     {/* Header */}
      <header className="relative z-10 flex items-center justify-between mb-8">
  
  
  
  
  <div className="fixed top-0 left-0 w-full flex justify-center z-50">
    
        {/* Fixed Colorful Top Nav */}
      <header className="fixed  top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-[50px] shadow-lg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
              {/* Left: Menu */}
              <div className="flex items-center gap-3">
                <button
                  aria-label="Open menu"
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-md hover:bg-white/20 transition"
                >
                  <Menu size={20} className="text-white" />
                </button>
                <div className="hidden sm:block">
                  <a className="text-white font-bold text-xl tracking-wide">MyShop</a>
                </div>
              </div>

              {/* Center: Search */}
              <div className="flex-1 px-4">
                <div className="max-w-xl mx-auto">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-white/70" />
                    </span>
                    <input
                      ref={inputRef}
                      id="top-search"
                     value={query}
          onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-10 pr-12 py-2 rounded-full bg-white/20 placeholder:text-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                    />
                    <button
                      onClick={() => console.log("search for", query)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 text-white text-sm hover:opacity-90 transition"
                    >
                      Go
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Shop Bag */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    aria-label="Open cart"
                    onClick={() => setBagOpen((s) => !s)}
                    className="p-2 rounded-md hover:bg-white/20 transition"
                  >
                      <div ref={cartRef} className="relative text-white cursor-pointer text-2xl">
          🛒

            {cart.length > 0 && (
       
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
                  </button>
         
                
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white font-bold">R</div>
                </div>
              </div>
            </div>
          </div>
        </header>

    
























        {/* Cart Drawer */}
        <AnimatePresence>
          {bagOpen && (
            <motion.aside
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-4 top-20 w-80 bg-gradient-to-br from-purple-600/80 to-pink-500/80 backdrop-blur rounded-xl p-4 z-50 text-white shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Your Cart</h3>
                <button onClick={() => setBagOpen(false)} className="p-1 rounded hover:bg-white/20">
                  <X size={16} />
                </button>
              </div>
        {/* Cart Items */}
{/* Cart Items */}



<div className="mt-4 space-y-3">


<div className="mt-4 space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
  {currentItemss.slice(0, 3).map((item) => (
    <div
      key={item.id}
      className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/20 dark:bg-gray-800/30 p-3 rounded-lg"
    >
      {/* Product Info */}
      <div>

        <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
 
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <button
          onClick={() => updateQty(item.id, item.qty - 1)}
          disabled={item.qty <= 1}
          className="bg-yellow-500 px-2 py-1 text-white rounded"
        >
          -
        </button>
        <span className="px-2 text-gray-900 dark:text-white">{item.qty}</span>
        <button
          onClick={() => updateQty(item.id, item.qty + 1)}
          className="bg-green-500 px-2 py-1 text-white rounded"
        >
          +
        </button>
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="px-2 py-1 text-red rounded"
      >
        <Delete />
      </button>
    </div>
  ))}

  {/* Total */}
  <div className="mt-4 flex items-center justify-between font-semibold text-lg text-gray-900 dark:text-white">
    <div>Total</div>
    <div>
      {/* ৳ {cart.reduce((acc, item) => acc + ((item.pricee || 0) * (item.qty || 1)), 0)} */}
    </div>
  </div>
</div>


  





  {!loading && !error3 && cart.length > 0 && (
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setCurrentPagecard((p) => Math.max(p - 1, 1))}
                disabled={currentPageCard === 1}
                className="px-3 py-1 bg-gray-700 rounded-lg disabled:opacity-40"
              >
                Prev
              </button>
              <span className="px-3 py-1 text-purple-400">
                {currentPageCard} / {totalPagescard}
              </span>
              <button
                onClick={() => setCurrentPagecard((p) => Math.min(p + 1, totalPagescard))}
                disabled={currentPageCard === totalPagescard}
                className="px-3 py-1 bg-gray-700 rounded-lg disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}







  {/* Checkout Button */}
  <button
   onClick={() => window.location.href = '/checkout/order'}
                
  className="w-full mt-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 hover:opacity-90">
    Checkout
  </button>
</div>
    </motion.aside>
  )}
</AnimatePresence>


        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black z-40"
              />
              <motion.nav
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                className="fixed top-0 left-0 bottom-0 w-80 bg-gradient-to-br from-pink-600/80 to-purple-700/80 backdrop-blur p-6 z-50 text-white shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold">Menu</div>
                  <button onClick={() => setSidebarOpen(false)} className="p-1 rounded hover:bg-white/20">
                    <X size={18} />
                  </button>
                </div>
                <div className="mt-6 space-y-3">
                  {/* <a className="block py-2 rounded hover:bg-white/20">Home</a>
                  <a className="block py-2 rounded hover:bg-white/20">Shop</a>
                  <a className="block py-2 rounded hover:bg-white/20">Categories</a>
                  <a className="block py-2 rounded hover:bg-white/20">Orders</a>
                  <a className="block py-2 rounded hover:bg-white/20">Settings</a> */}

                ``  
                
                 {producmenu.map((user) => (
        <a    href={`/products/${currentCategory}/${user.catagori}/${user.brand}`}  className="block py-2 rounded text-blue hover:bg-white/20">{user.brand}</a>
      ))}
       
                
                
                
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>

<CountUp end={54445454} duration={2} separator="," />

        {/* Floating Bag Button */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 sm:hidden">
          <button
            onClick={() => setBagOpen(true)}
            className="px-4 py-2 rounded-full flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-white shadow-lg"
          >
            <ShoppingCart size={16} />
            <span>Cart ({cartCount})</span>
          </button>
        </div>
        </div>

  
  
  
  
        {/* <h1 className="text-4xl font-extrabold text-cyan-400 drop-shadow-[0_0_25px_rgba(0,255,255,0.9)] animate-pulse">
          Cyber Neon Parallax
        </h1>
        <div ref={cartRef} className="relative text-white cursor-pointer text-2xl">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div> */}
      </header>


 
    <div className="min-h-screen relative bg-black px-4 md:px-10 py-12 overflow-hidden perspective-[1000px]" ref={containerRef}>
      
      {/* Cursor Neon Glow */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed w-14 h-14 rounded-full bg-cyan-400/50 blur-3xl mix-blend-screen transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100"
      />

 

      {/* Floating Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className={`w-1 h-1 bg-cyan-400 rounded-full animate-float`}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

     
      {/* Product Grid */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* {currentItems.map((product) => ( */}
          
            {filteredItems.length > 0 ? (
          filteredItems.map((product) => (
          
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.15, rotateX: -5, rotateY: 5 }}
            className="relative rounded-3xl overflow-hidden cursor-pointer shadow-[0_0_25px_rgba(0,255,255,0.3)] hover:shadow-[0_0_80px_rgba(0,255,255,0.7)] transition-all duration-300 border-2 border-cyan-400 hover:border-pink-500 bg-gray-900 animate-cardGlow"
          >
            {/* Full Clear Image */}
            <div className="relative w-full h-80 overflow-hidden rounded-2xl border border-cyan-500 shadow-[0_0_35px_rgba(0,255,255,0.6)] group">
              <img
                src={
                  product.img
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads_product/${product.img}`
                    : product.imglink || "/fallback.png"
                }
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-40 transition-opacity duration-500 animate-pulse" />
            </div>

            {/* Overlay info */}
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 py-3 text-center">
              <h2 className="text-white font-bold text-sm sm:text-base drop-shadow-[0_0_15px_rgba(0,255,255,0.9)] truncate">
                {product.model}
              </h2>
<h3>{product.name}</h3>

<h3>price : {product.pricee}</h3>
<del>price : {product.reprice}</del>
              {/* Star Rating */}
              <div className="flex justify-center mt-1 space-x-1">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < (product.rating || 4)
                        ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(255,255,0,0.9)]"
                        : "text-gray-600"
                    }`}
                    fill={i < (product.rating || 4) ? "currentColor" : "none"}
                  />
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-3 flex justify-center gap-2 flex-wrap">
                <a                                href={`/products-view/${product.id}`}
                 
                  className="flex items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-[0_0_12px_rgba(0,255,255,0.8)] hover:scale-110 transition"
                >
                  <Eye className="w-4 h-4 drop-shadow-[0_0_6px_rgba(0,255,255,0.8)]" />
                  View
                </a>
                <button
                  onClick={(e)=> handleAddToCart(e,product)}
                  className="flex items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-[0_0_15px_rgba(255,0,255,0.9)] hover:scale-110 transition"
                >
                  <ShoppingCart className="w-4 h-4 drop-shadow-[0_0_8px_rgba(255,0,255,0.9)]" />
                  Add
                </button>
                <button
                  onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
                  className="flex items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold shadow-[0_0_12px_rgba(0,255,0,0.9)] hover:scale-110 transition"
                >
                  <Share2 className="w-4 h-4 drop-shadow-[0_0_6px_rgba(0,255,0,0.8)]" />
                  Share
                </button>
              </div>
            </div>
          </motion.div>
        ))): (
          <h1 className="text-center text-white col-span-full">
            😥 No products found
          </h1>
        )}

 















      </div>

      <style jsx>{`
        @keyframes cardGlow {
          0%,100% {box-shadow:0 0 20px rgba(0,255,255,0.3);}
          50% {box-shadow:0 0 50px rgba(255,0,255,0.5);}
        }
        .animate-cardGlow {
          animation: cardGlow 3s ease-in-out infinite alternate;
        }

        @keyframes float {
          0% { transform: translateY(0) rotate(0deg);}
          50% { transform: translateY(-20px) rotate(45deg);}
          100% { transform: translateY(0) rotate(90deg);}
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>



{!loading && !error && products.length > 0 && (
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-700 rounded-lg disabled:opacity-40"
              >
                Prev
              </button>
              <span className="px-3 py-1 text-purple-400">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-700 rounded-lg disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}



    </>
  );
}


































































