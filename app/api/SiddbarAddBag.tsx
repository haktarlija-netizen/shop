


"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCartStore } from "./Carssotres";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search,ShoppingCart, ShoppingBag, X } from "lucide-react";
import CountUp from "react-countup";

export default function TopSearchShopBagSidebar() {



      const { cart, addToCart, removeFromCart, updateQty, clearCart } = useCartStore();


      const cartRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cartCount, setCartCount] = useState(3);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!sidebarOpen) inputRef.current?.blur();
  }, [sidebarOpen]);

  return (
<>
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

        {/* Page content spacer */}
        {/* <main className="pt-20">
          <div className="max-w-7xl mx-auto p-6">
            <div className="rounded-xl bg-white/10 backdrop-blur p-6 text-white shadow-lg">
              <h1 className="text-3xl font-bold mb-2">Welcome to MyShop</h1>
              <p className="text-white/80">Colorful fixed menu with search, cart, and sidebar popup.</p>

              {/* Example products */}
              {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="p-4 rounded-lg bg-gradient-to-br from-pink-500/40 to-purple-600/40 shadow-md">
                    <div className="h-40 rounded-md bg-white/20 flex items-center justify-center text-white font-semibold">Product {i + 1}</div>
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <div className="font-semibold">Product {i + 1}</div>
                        <div className="text-sm text-white/80">৳ {150 + i * 20}</div>
                      </div>
                      <button
                        onClick={() => console.log("add product", i + 1)}
                        className="px-3 py-1 rounded bg-gradient-to-r from-yellow-400 to-pink-500 text-white hover:opacity-90 transition"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main> */} 





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
  {cart.map((item) => (
    <div
      key={item.id}
      className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/20 p-3 rounded-lg"
    >
      {/* Product Info */}
      <div>
        <div className="font-medium">{item.name}</div>
        <div className="text-sm text-white/80">৳ {item.price}</div>
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
        <span className="px-2">{item.qty}</span>
        <button
          onClick={() => updateQty(item.id, item.qty + 1)}
          className="bg-green-500 px-2 py-1 text-white rounded"
        >
          +
        </button>
      </div>
    </div>
  ))}

  {/* Total */}
  <div className="mt-4 flex items-center justify-between font-semibold text-lg">
    <div>Total</div>
    <div>৳ {cart.reduce((acc, item) => acc + item.price * item.qty, 0)}</div>
  </div>

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
      </>

  );
}










// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, Search, ShoppingBag, X } from "lucide-react";

// // Default export a single React component (Next.js / React 18 client component)
// export default function TopSearchShopBagSidebar() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [bagOpen, setBagOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [cartCount, setCartCount] = useState(3);
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   useEffect(() => {
//     // autofocus search on small screens if sidebar closed
//     if (!sidebarOpen) inputRef.current?.blur();
//   }, [sidebarOpen]);

//   return (
//     <div className="min-h-screen bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/images/local-bg.jpg')" }}>
//       {/* translucent overlay so content is readable over the bg */}
//       <div className="min-h-screen bg-black/30">
//         {/* Top Nav */}
//         <header className="fixed top-0 left-0 right-0 z-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between h-16">
//               {/* Left: Menu */}
//               <div className="flex items-center gap-3">
//                 <button
//                   aria-label="Open menu"
//                   onClick={() => setSidebarOpen(true)}
//                   className="p-2 rounded-md hover:bg-white/10 transition"
//                 >
//                   <Menu size={20} className="text-white" />
//                 </button>

//                 <div className="hidden sm:block">
//                   <a className="text-white font-semibold text-lg">MyShop</a>
//                 </div>
//               </div>

//               {/* Center: Search */}
//               <div className="flex-1 px-4">
//                 <div className="max-w-xl mx-auto">
//                   <label htmlFor="top-search" className="sr-only">Search products</label>
//                   <div className="relative">
//                     <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
//                       <Search size={18} className="text-white/70" />
//                     </span>
//                     <input
//                       ref={inputRef}
//                       id="top-search"
//                       value={query}
//                       onChange={(e) => setQuery(e.target.value)}
//                       placeholder="Search products, brands, or categories..."
//                       className="w-full pl-10 pr-12 py-2 rounded-full bg-white/10 placeholder:text-white/60 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30"
//                     />

//                     <button
//                       onClick={() => console.log('search for', query)}
//                       className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-white/8 text-white text-sm hover:bg-white/12 transition"
//                     >
//                       Search
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Right: Shop Bag (fixed) */}
//               <div className="flex items-center gap-3">
//                 <div className="relative">
//                   <button
//                     aria-label="Open cart"
//                     onClick={() => setBagOpen((s) => !s)}
//                     className="p-2 rounded-md hover:bg-white/10 transition"
//                   >
//                     <ShoppingBag size={20} className="text-white" />
//                   </button>

//                   {/* Badge */}
//                   <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500 text-white">
//                     {cartCount}
//                   </span>
//                 </div>

//                 {/* Small profile placeholder */}
//                 <div className="hidden sm:flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">R</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page content spacer so header doesn't overlap */}
//         <main className="pt-20">
//           <div className="max-w-7xl mx-auto p-6">
//             <div className="rounded-xl bg-white/6 backdrop-blur p-6 text-white">
//               <h1 className="text-2xl font-bold mb-2">Welcome to MyShop</h1>
//               <p className="text-white/80">This demo shows a top search bar, fixed shop bag, and a sidebar popup with a nice local background. Replace <code>/images/local-bg.jpg</code> with your own background image in the public folder.</p>

//               {/* Example content */}
//               <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {Array.from({ length: 6 }).map((_, i) => (
//                   <div key={i} className="p-4 rounded-lg bg-white/4">
//                     <div className="h-40 rounded-md bg-white/6 flex items-center justify-center text-white/90">Product {i + 1}</div>
//                     <div className="mt-3 flex items-center justify-between">
//                       <div>
//                         <div className="font-semibold">Product {i + 1}</div>
//                         <div className="text-sm text-white/70">৳ {150 + i * 20}</div>
//                       </div>
//                       <button
//                         onClick={(e) => {
//                           // example product object
//                           const product = { id: i + 1, name: `Product ${i + 1}`, price: 150 + i * 20 };
//                           // keep access to click event and pass product
//                           // call your add-to-cart animation / logic here
//                           console.log('add', product);
//                         }}
//                         className="px-3 py-1 rounded bg-white/8 text-white hover:bg-white/12 transition"
//                       >
//                         Add
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </main>

//         {/* Cart Drawer (animated) */}
//         <AnimatePresence>
//           {bagOpen && (
//             <motion.aside
//               initial={{ opacity: 0, x: 30 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 30 }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="fixed right-4 top-20 w-80 bg-white/6 backdrop-blur rounded-xl p-4 z-50 text-white shadow-lg"
//             >
//               <div className="flex items-center justify-between">
//                 <h3 className="font-semibold">Your Cart</h3>
//                 <button onClick={() => setBagOpen(false)} className="p-1 rounded hover:bg-white/8">
//                   <X size={16} />
//                 </button>
//               </div>

//               <div className="mt-4">
//                 <div className="space-y-3">
//                   {Array.from({ length: cartCount }).map((_, i) => (
//                     <div key={i} className="flex items-center justify-between bg-white/4 p-2 rounded">
//                       <div>
//                         <div>Product {i + 1}</div>
//                         <div className="text-sm text-white/70">৳ {120 + i * 10}</div>
//                       </div>
//                       <div className="text-white/90">1</div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-4 flex items-center justify-between font-semibold">
//                   <div>Total</div>
//                   <div>৳ {cartCount * 150}</div>
//                 </div>

//                 <button className="w-full mt-4 py-2 rounded-full bg-white/10">Checkout</button>
//               </div>
//             </motion.aside>
//           )}
//         </AnimatePresence>

//         {/* Sidebar overlay + panel */}
//         <AnimatePresence>
//           {sidebarOpen && (
//             <>
//               {/* Backdrop */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 0.5 }}
//                 exit={{ opacity: 0 }}
//                 onClick={() => setSidebarOpen(false)}
//                 className="fixed inset-0 bg-black z-40"
//               />

//               {/* Panel */}
//               <motion.nav
//                 initial={{ x: -320 }}
//                 animate={{ x: 0 }}
//                 exit={{ x: -320 }}
//                 transition={{ type: "spring", stiffness: 260, damping: 30 }}
//                 className="fixed top-0 left-0 bottom-0 w-80 bg-white/6 backdrop-blur p-6 z-50 text-white"
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="text-xl font-bold">Menu</div>
//                   <button onClick={() => setSidebarOpen(false)} className="p-1 rounded hover:bg-white/8">
//                     <X size={18} />
//                   </button>
//                 </div>

//                 <div className="mt-6 space-y-3">
//                   <a className="block py-2 rounded hover:bg-white/8">Home</a>
//                   <a className="block py-2 rounded hover:bg-white/8">Shop</a>
//                   <a className="block py-2 rounded hover:bg-white/8">Categories</a>
//                   <a className="block py-2 rounded hover:bg-white/8">Orders</a>
//                   <a className="block py-2 rounded hover:bg-white/8">Settings</a>
//                 </div>

//                 <div className="mt-6 border-t border-white/6 pt-4">
//                   <div className="text-sm text-white/70">Need help?</div>
//                   <button className="mt-3 px-3 py-2 rounded bg-white/8">Contact Support</button>
//                 </div>
//               </motion.nav>
//             </>
//           )}
//         </AnimatePresence>

//         {/* Floating shop bag (mobile fixed at bottom) */}
//         <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 sm:hidden">
//           <button
//             onClick={() => setBagOpen(true)}
//             className="px-4 py-2 rounded-full flex items-center gap-2 bg-white/8 text-white backdrop-blur"
//           >
//             <ShoppingBag size={16} />
//             <span>Cart ({cartCount})</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

