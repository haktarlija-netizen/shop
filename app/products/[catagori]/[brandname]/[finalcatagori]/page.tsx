





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





  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
  }, [currentCategory, barnds, finalname]);


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

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, Product:Product) => {
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
      ৳ {cart.reduce((acc, item) => acc + ((item.pricee || 0) * (item.qty || 1)), 0)}
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
  <button className="w-full mt-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 hover:opacity-90">
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
                  <a className="block py-2 rounded hover:bg-white/20">Home</a>
                  <a className="block py-2 rounded hover:bg-white/20">Shop</a>
                  <a className="block py-2 rounded hover:bg-white/20">Categories</a>
                  <a className="block py-2 rounded hover:bg-white/20">Orders</a>
                  <a className="block py-2 rounded hover:bg-white/20">Settings</a>
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
                <Link
                  href={`/products-view/${product.id}}`}
                  className="flex items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-[0_0_12px_rgba(0,255,255,0.8)] hover:scale-110 transition"
                >
                  <Eye className="w-4 h-4 drop-shadow-[0_0_6px_rgba(0,255,255,0.8)]" />
                  View
                </Link>
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




































































// // 'use client';

// // import { useEffect, useState, useRef } from 'react';
// // import { motion } from 'framer-motion';
// // import Api from '../../../../api/Api';
// // import Link from 'next/link';
// // import { useParams } from 'next/navigation';
// // import { ShoppingCart, Eye, Star, Share2 } from "lucide-react";

// // export default function ProductGridPage() {
// //   const [products, setProducts] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const cartRef = useRef<HTMLDivElement>(null);
// //   const [cartCount, setCartCount] = useState(0);

// //   const params = useParams();
// //   const currentCategory = params?.catagori as string | undefined;
// //   const barnds = params?.brandname as string | undefined;
// //   const finalname = params?.finalcatagori as string | undefined;

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       if (!currentCategory) return;
// //       setLoading(true);
// //       try {
// //         const res = await Api.get(`/get_all_product_brandName_final/${barnds}/${currentCategory}/${finalname}`);
// //         setProducts(res.data.message);
// //       } catch (err) {
// //         console.error('❌ Fetch error:', err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [currentCategory, barnds, finalname]);

// //   const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
// //     const item = e.currentTarget.getBoundingClientRect();
// //     const bag = cartRef.current?.getBoundingClientRect();
// //     if (!bag) return;

// //     const flyingItem = document.createElement("div");
// //     flyingItem.innerText = "🛒";
// //     flyingItem.style.position = "fixed";
// //     flyingItem.style.left = `${item.left}px`;
// //     flyingItem.style.top = `${item.top}px`;
// //     flyingItem.style.fontSize = "32px";
// //     flyingItem.style.zIndex = "9999";
// //     flyingItem.style.transition = "transform 0.8s ease-in-out";
// //     document.body.appendChild(flyingItem);

// //     requestAnimationFrame(() => {
// //       const dx = bag.left - item.left;
// //       const dy = bag.top - item.top;
// //       flyingItem.style.transform = `translate(${dx}px, ${dy}px) scale(0.5) rotate(360deg)`;
// //     });

// //     setTimeout(() => {
// //       flyingItem.remove();
// //       setCartCount((prev) => prev + 1);
// //     }, 800);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">
// //         Loading products...
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen relative bg-black px-4 md:px-10 py-12 overflow-hidden">
// //       {/* Header */}
// //       <header className="relative z-10 flex items-center justify-between mb-8">
// //         <h1 className="text-4xl font-extrabold text-cyan-400 drop-shadow-[0_0_25px_rgba(0,255,255,0.9)] animate-pulse">
// //           Products
// //         </h1>
// //         <div ref={cartRef} className="relative text-white cursor-pointer text-2xl">
// //           🛒
// //           {cartCount > 0 && (
// //             <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
// //               {cartCount}
// //             </span>
// //           )}
// //         </div>
// //       </header>

// //       {/* Product Grid */}
// //       <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
// //         {products.map((product) => (
// //           <motion.div
// //             key={product.id}
// //             whileHover={{ scale: 1.12, rotateX: -5, rotateY: 5 }}
// //             className="relative rounded-3xl overflow-hidden cursor-pointer shadow-[0_0_25px_rgba(0,255,255,0.3)] hover:shadow-[0_0_60px_rgba(0,255,255,0.7)] transition-all duration-300 bg-gray-900 border-2 border-cyan-400 hover:border-pink-500"
// //           >
// //             {/* Full Clear Image */}
// //             <div className="relative w-full h-80 overflow-hidden rounded-2xl border border-cyan-500 shadow-[0_0_35px_rgba(0,255,255,0.6)] group">
// //               <img
// //                 src={
// //                   product.img
// //                     ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads_product/${product.img}`
// //                     : product.imglink || "/fallback.png"
// //                 }
// //                 alt={product.name}
// //                 className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
// //                 loading="lazy"
// //               />
// //               {/* Optional shimmer overlay */}
// //               <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
// //             </div>

// //             {/* Overlay info */}
// //             <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 py-3 text-center">
// //               <h2 className="text-white font-bold text-sm sm:text-base drop-shadow-[0_0_15px_rgba(0,255,255,0.9)] truncate">
// //                 {product.name}
// //               </h2>

// //               {/* Star Rating */}
// //               <div className="flex justify-center mt-1 space-x-1">
// //                 {[...Array(5)].map((_, i) => (
// //                   <Star
// //                     key={i}
// //                     size={16}
// //                     className={`${
// //                       i < (product.rating || 4)
// //                         ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(255,255,0,0.9)]"
// //                         : "text-gray-600"
// //                     }`}
// //                     fill={i < (product.rating || 4) ? "currentColor" : "none"}
// //                   />
// //                 ))}
// //               </div>

// //               {/* Buttons */}
// //               <div className="mt-3 flex justify-center gap-2 flex-wrap">
// //                 {/* View */}
// //                 <Link
// //                   href={`/products/${currentCategory}/${product.catagori}`}
// //                   className="flex items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-[0_0_12px_rgba(0,255,255,0.8)] hover:scale-110 transition"
// //                 >
// //                   <Eye className="w-4 h-4 drop-shadow-[0_0_6px_rgba(0,255,255,0.8)]" />
// //                   View
// //                 </Link>

// //                 {/* Add to cart */}
// //                 <button
// //                   onClick={handleAddToCart}
// //                   className="flex items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-[0_0_15px_rgba(255,0,255,0.9)] hover:scale-110 transition"
// //                 >
// //                   <ShoppingCart className="w-4 h-4 drop-shadow-[0_0_8px_rgba(255,0,255,0.9)]" />
// //                   Add
// //                 </button>

// //                 {/* Share */}
// //                 <button
// //                   onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
// //                   className="flex items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold shadow-[0_0_12px_rgba(0,255,0,0.9)] hover:scale-110 transition"
// //                 >
// //                   <Share2 className="w-4 h-4 drop-shadow-[0_0_6px_rgba(0,255,0,0.8)]" />
// //                   Share
// //                 </button>
// //               </div>
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }





// // 'use client';

// // import { useEffect, useState, useRef } from 'react';
// // import { motion } from 'framer-motion';
// // import Api from '../../../../api/Api';
// // import Link from 'next/link';
// // import { useParams } from 'next/navigation';
// // import { ShoppingCart, Eye, Star } from "lucide-react";

// // export default function ProductListingPage() {
// //   const [products, setProducts] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const cartRef = useRef<HTMLDivElement>(null);
// //   const [cartCount, setCartCount] = useState(0);

// //   const params = useParams();
// //   const currentCategory = params?.catagori as string | undefined;
// //   const barnds = params?.brandname as string | undefined;
// //   const finalname = params?.finalcatagori as string | undefined;

// //   // 📡 Load products
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       if (!currentCategory) return;
// //       setLoading(true);
// //       try {
// //         const res = await Api.get(`/get_all_product_brandName_final/${barnds}/${currentCategory}/${finalname}`);
// //         setProducts(res.data.message);
// //       } catch (err) {
// //         console.error('❌ Fetch error:', err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, [currentCategory, barnds, finalname]);

// //   // 🛒 Add to cart animation
// //   const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
// //     const item = e.currentTarget.getBoundingClientRect();
// //     const bag = cartRef.current?.getBoundingClientRect();
// //     if (!bag) return;

// //     const flyingItem = document.createElement("div");
// //     flyingItem.innerText = "🛒";
// //     flyingItem.style.position = "fixed";
// //     flyingItem.style.left = `${item.left}px`;
// //     flyingItem.style.top = `${item.top}px`;
// //     flyingItem.style.fontSize = "32px";
// //     flyingItem.style.zIndex = "9999";
// //     flyingItem.style.transition = "transform 0.8s ease-in-out";
// //     document.body.appendChild(flyingItem);

// //     requestAnimationFrame(() => {
// //       const dx = bag.left - item.left;
// //       const dy = bag.top - item.top;
// //       flyingItem.style.transform = `translate(${dx}px, ${dy}px) scale(0.5) rotate(360deg)`;
// //     });

// //     setTimeout(() => {
// //       flyingItem.remove();
// //       setCartCount((prev) => prev + 1);
// //     }, 800);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">
// //         Loading products...
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-black px-4 md:px-10 py-12">
// //       <header className="flex items-center justify-between mb-8">
// //         <h1 className="text-4xl font-extrabold text-cyan-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]">
// //           Products
// //         </h1>
// //         <div ref={cartRef} className="relative text-white cursor-pointer text-2xl">
// //           🛒
// //           {cartCount > 0 && (
// //             <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
// //               {cartCount}
// //             </span>
// //           )}
// //         </div>
// //       </header>

// //       {/* Product Grid */}
// //       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
// //         {products.map((product) => (
// //           <motion.div
// //             key={product.id}
// //             whileHover={{ scale: 1.05 }}
// //             className="relative rounded-xl overflow-hidden cursor-pointer shadow-lg bg-gray-900 hover:shadow-[0_0_40px_rgba(0,255,255,0.5)] transition-all"
// //           >
// //             {/* Image with shimmer */}
// //             <div className="relative w-full h-64 overflow-hidden rounded-xl">
// //               <img
// //                 src={
// //                   product.img
// //                     ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads_product/${product.img}`
// //                     : product.imglink || "/fallback.png"
// //                 }
// //                 alt={product.name}
// //                 className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
// //                 loading="lazy"
// //               />
// //               <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 opacity-30" />
// //             </div>

// //             {/* Overlay Text */}
// //             <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 py-3 text-center">
// //               <h2 className="text-white font-bold text-sm sm:text-base drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] truncate">
// //                 {product.name}
// //               </h2>

// //               {/* Rating */}
// //               <div className="flex justify-center mt-1 space-x-1">
// //                 {[...Array(5)].map((_, i) => (
// //                   <Star
// //                     key={i}
// //                     size={16}
// //                     className={`${
// //                       i < (product.rating || 4)
// //                         ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(255,255,0,0.9)]"
// //                         : "text-gray-600"
// //                     }`}
// //                     fill={i < (product.rating || 4) ? "currentColor" : "none"}
// //                   />
// //                 ))}
// //               </div>

// //               {/* Buttons */}
// //               <div className="mt-3 flex justify-center gap-2">
// //                 <Link
// //                   href={`/products/${currentCategory}/${product.catagori}`}
// //                   className="flex items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-[0_0_12px_rgba(0,255,255,0.7)] hover:scale-110 transition"
// //                 >
// //                   <Eye className="w-4 h-4 drop-shadow-[0_0_6px_rgba(0,255,255,0.8)]" />
// //                   View
// //                 </Link>

// //                 <button
// //                   onClick={handleAddToCart}
// //                   className="flex items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-[0_0_15px_rgba(255,0,255,0.7)] hover:scale-110 transition"
// //                 >
// //                   <ShoppingCart className="w-4 h-4 drop-shadow-[0_0_8px_rgba(255,0,255,0.9)]" />
// //                   Add
// //                 </button>
// //               </div>
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }







// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { motion } from 'framer-motion';
// // import Api from '../../../../api/Api';
// // import Link from 'next/link';
// // import { useParams } from 'next/navigation';

// // export default function Home() {
// //   const [products, setProducts] = useState<any[]>([]);
// //   const [brand, setBrand] = useState('');
// //   const [branNams, setBrnadnms] = useState('');
// //   const [loading, setLoading] = useState(true);

// //   const params = useParams();
// //   const currentCategory = params?.catagori as string | undefined;
// //   const barnds = params?.brandname as string | undefined;
// //   const finalname = params?.finalcatagori as string | undefined;

  
// //   // 📡 API Data Load
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       if (!currentCategory) return;
// //       setLoading(true);
// //       try {
// //         const res = await Api.get(`/get_all_product_brandName_final/${barnds}/${currentCategory}/${finalname}`);
// //         setProducts(res.data.message);
// //       } catch (err) {
// //         console.error('❌ Fetch error:', err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();

// //     // প্রতি 3 সেকেন্ডে আপডেট চাইলে
    
// //   }, [currentCategory]);

// //   const handleProductClick = (product: any) => {
// //     if (brand) {
// //       setBrnadnms(product.brand);
// //     } else {
// //       setBrand(product.catagori);
// //     }
// //   };

// //   return (
// //     <main className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">
// //       {/* 🔄 Loading State */}

// //       {'brand names x'+currentCategory+' '+finalname} {barnds}
// //       {loading ? (
// //         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 p-4 animate-pulse">
// //           {Array.from({ length: 8 }).map((_, i) => (
// //             <div
// //               key={i}
// //               className="rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 h-48"
// //             ></div>
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
// //           {products.map((product: any) => (
// //             <motion.div
// //               key={product.id}
// //               whileHover={{ scale: 1.03 }}
// //               whileTap={{ scale: 0.97 }}
// //               onClick={() => handleProductClick(product)}
// //               className="relative group rounded-xl overflow-hidden shadow-lg 
// //                 bg-white dark:bg-zinc-900 cursor-pointer transition-all 
// //                 border border-transparent hover:border-cyan-400 hover:shadow-cyan-400/50"
// //             >
// //               {/* Image Section */}
// //               <div className="aspect-square overflow-hidden">
// //                 <img
// //                   src={
// //                     product.img
// //                       ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads_product/${product.img}`
// //                       : product.imglink           //this is a link img 
// //                   }
// //                   alt={product.brand || 'Product Image'}
// //                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
// //                 />
// //               </div>

// //               {/* Overlay Text */}
// //               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-3">
// //                 <h3 className="text-sm md:text-base font-semibold drop-shadow-lg">
// //                   { product.brand }
// //                 </h3>
// //                 <Link
// //                   href={`/product-view/${product.id}`}
// //                   className="text-xs text-cyan-300 underline"
// //                 >
// //                   বিস্তারিত দেখুন
// //                 </Link>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       )}
// //     </main>
// //   );
// // }







// // // 'use client'

// // // import Head from 'next/head';
// // // import { useEffect, useState } from 'react';
// // // import { motion } from 'framer-motion';

// // // import Api from '../../api/Api';

// // // import Link from 'next/link';



// // // export default function Home() {



// // //   const [products, setProducts] = useState<any[]>([]);
// // //   const [brand, setBrand] = useState('');
// // //   const [branNams, setBrnadnms] = useState('');
// // //   const [getBrand, setProducts_brand] = useState<any[]>([]);




  
// // // const [actions_new_old, setAction] =useState<string>('old');

// // //   useEffect(() => {
// // //     const interval = setInterval(() => {
// // //       const current = localStorage.getItem('oldOrNew');
// // //       if (current !== actions_new_old) {
// // //         setAction(current || 'old');
// // //       }
// // //     }, 1000); // প্রতি ১ সেকেন্ডে চেক করবে

// // //     return () => clearInterval(interval);
// // //   }, [actions_new_old]);






// // //   useEffect(() => {
// // //     const fetchData = () => {
// // //       getAllProducts();
// // //       getUserBrandName();
// // //       getUserBrandNameFinal();
// // //     };

// // //     fetchData();
// // //     const interval = setInterval(fetchData, 3000);
// // //     return () => clearInterval(interval);
// // //   }, [actions_new_old]);

// // //   const getAllProducts = () => {
// // //     Api.get(`/get_all_product/${actions_new_old}`)
// // //       .then(res => {
// // //         if (!brand) {
// // //           setProducts(res.data.message);
        

// // //                   }
// // //       })
// // //       .catch(err => console.error('❌ Product load error:', err));
// // //   };

// // //   const getUserBrandName = () => {
// // //     Api.get(`/get_all_product_brandName/${brand}/${actions_new_old}`)
// // //       .then(res => {
// // //         setProducts_brand(res.data.message);
// // //         if (brand) setProducts(res.data.message);
// // //       })
// // //       .catch(err => console.error('❌ Brand get error:', err));
// // //   };

// // //   const getUserBrandNameFinal = () => {
// // //     if (!branNams) return;
// // //     Api.get(`/get_all_product_brandName_final/${brand}/${actions_new_old}/${branNams}`)
// // //       .then(res => {
// // //         setProducts_brand(res.data.message);
// // //       })
// // //       .catch(err => console.error('❌ Final brand category error:', err));
// // //   };

// // //   const handleProductClick = (product: any) => {
// // //     if (brand) {
// // //       setBrnadnms(product.brand);
// // //     } else {
// // //       setBrand(product.catagori);
// // //     }
// // //   };

// // //   return (
// // //     <>
    


// // //     <Head>
// // //       <title>home product</title>
// // //   <meta name="robots" content="index, follow" />
// // //   <meta name="language" content="bn" />
// // //   <meta name="author" content="বাংলা ই-কমার্স" />
// // //   <link rel="canonical" href="https://yourdomain.com" />
// // //   <link rel="alternate" hrefLang="bn" href="https://yourdomain.com" />
// // // </Head>




  



// // //       <main className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">

  

        




// // //           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
// // //       {products.map((product: any) => (
// // //         <motion.div
// // //           key={product.id}
// // //           whileHover={{ scale: 1.03 }}
// // //           whileTap={{ scale: 0.97 }}
// // //           onClick={() => handleProductClick(product)}
// // //           className="relative group rounded-xl overflow-hidden shadow-md bg-white dark:bg-zinc-900 cursor-pointer transition-all"
// // //         >
// // //           {/* Image Section */}
// // //           <div className="aspect-square overflow-hidden">
// // //             <img
// // //               src={
// // //                 product.img
// // //                   ? `http://localhost:8000/uploads_product/${product.img}`
// // //                   : product.imglink
// // //               }
// // //               alt={product.name || 'Product Image'}
// // //               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
// // //             />
// // //           </div>

// // //           {/* Overlay Text */}
// // //           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3">
// // //             <h3 className="text-sm md:text-base font-semibold">
// // //               {brand ? product.brand : product.catagori}
// // //             </h3>
// // //             <Link
// // //               href={`/product-view/${product.id}`}
// // //               className="text-xs text-cyan-300 underline"
// // //             >
// // //               বিস্তারিত দেখুন
// // //             </Link>
// // //           </div>
// // //         </motion.div>
// // //       ))}
// // //     </div>



   
// // //       </main>
// // //     </>
// // //   );
// // // }




// // // "use client";


// //         // <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-3">
// //         //   <Typewriter
// //         //     options={{
// //         //       strings: [
// //         //         'পণ্য লোড হচ্ছে...',
// //         //         'দয়া করে একটু অপেক্ষা করুন...',
// //         //         'সেরা পণ্যটি আনছি আপনার জন্য!',
// //         //       ],
// //         //       autoStart: true,
// //         //       loop: true,
// //         //       delay: 60,
// //         //     }}
// //         //   />
// //         // </h1>


// // // import { useEffect, useState, useRef } from "react";
// // // import { motion } from "framer-motion";
// // // import Api from "../../api/Api";

// // // export default function TopProductsPage({ actions_new_old = "new" }) {
// // //   const [products, setProducts] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const bagRef = useRef<HTMLDivElement>(null);
// // //   const [cartCount, setCartCount] = useState(0);

// // //   useEffect(() => {
// // //     setLoading(true);
// // //     Api.get(`/get_all_product/${actions_new_old}`)
// // //       .then((res) => {
// // //         setProducts(res.data.message || []);
// // //         setLoading(false);
// // //       })
// // //       .catch((err) => {
// // //         console.error("Error fetching products:", err);
// // //         setLoading(false);
// // //       });
// // //   }, [actions_new_old]);

// // //   const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
// // //     const item = e.currentTarget.getBoundingClientRect();
// // //     const bag = bagRef.current?.getBoundingClientRect();
// // //     if (!bag) return;

// // //     const flyingItem = document.createElement("div");
// // //     flyingItem.innerText = "🛍️";
// // //     flyingItem.style.position = "fixed";
// // //     flyingItem.style.left = `${item.left}px`;
// // //     flyingItem.style.top = `${item.top}px`;
// // //     flyingItem.style.fontSize = "32px";
// // //     flyingItem.style.zIndex = "9999";
// // //     flyingItem.style.transition = "transform 0.8s ease-in-out";
// // //     document.body.appendChild(flyingItem);

// // //     requestAnimationFrame(() => {
// // //       const dx = bag.left - item.left;
// // //       const dy = bag.top - item.top;
// // //       flyingItem.style.transform = `translate(${dx}px, ${dy}px) scale(0.5) rotate(360deg)`;
// // //     });

// // //     setTimeout(() => {
// // //       flyingItem.remove();
// // //       setCartCount((prev) => prev + 1);
// // //     }, 800);
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">
// // //         Loading products...
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-900 px-4 md:px-10 py-12">
// // //       <header className="flex items-center justify-between mb-8">
// // //         <h1 className="text-4xl font-extrabold text-yellow-400 neon-glow">
// // //           Top Products
// // //         </h1>

// // //         <div ref={bagRef} className="relative text-white cursor-pointer">
// // //           🛒
// // //           {cartCount > 0 && (
// // //             <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
// // //               {cartCount}
// // //             </span>
// // //           )}
// // //         </div>
// // //       </header>

// // //       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
// // //         {products.map((product) => (
// // //           <motion.div
// // //             key={product.id}
// // //             whileHover={{ scale: 1.05 }}
// // //             className="relative rounded-xl overflow-hidden cursor-pointer shadow-lg"
// // //           >
// // //             {/* Lazy loading with shimmer */}
// // //             <div className="relative w-full h-48 bg-gray-700 overflow-hidden rounded-xl">
// // //               <img
// // //                 src={
// // //                   product.img
// // //                     ? `http://localhost:8000/uploads_product/${product.img}`
// // //                     : product.imglink
// // //                 }
// // //                 alt={product.name}
// // //                 className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
// // //                 loading="lazy"
// // //               />
// // //               <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 opacity-30" />
// // //             </div>

// // //             {/* Category / Name overlay */}
// // //             <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 py-2 text-center">
// // //               <h2 className="text-white font-bold text-sm sm:text-base neon-glow truncate">
// // //                 {product.name}
// // //               </h2>
// // //               <p className="text-yellow-300 text-xs sm:text-sm neon-glow truncate">
// // //                 {product.brand || "Unknown Category"}
// // //               </p>
// // //             </div>

// // //             {/* Add to cart button */}
// // //             <button
// // //               onClick={handleAddToCart}
// // //               className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-md font-semibold hover:bg-yellow-300 transition"
// // //             >
// // //               🛒
// // //             </button>
// // //           </motion.div>
// // //         ))}
// // //       </div>

// // //       <style jsx>{`
// // //         .neon-glow {
// // //           text-shadow: 0 0 5px #facc15, 0 0 10px #f59e0b, 0 0 20px #f97316;
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // }

