'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Api from '../../../api/Api';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [brand, setBrand] = useState('');
  const [branNams, setBrnadnms] = useState('');
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const currentCategory = params?.catagori as string | undefined;
  const barnds = params?.brandname as string | undefined;

  
  // 📡 API Data Load
  useEffect(() => {
    const fetchData = async () => {
      if (!currentCategory) return;
      setLoading(true);
      try {
        const res = await Api.get(`/get_all_product_brandName/${barnds}/${currentCategory}`);
        setProducts(res.data.message);
      } catch (err) {
        console.error('❌ Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // প্রতি 3 সেকেন্ডে আপডেট চাইলে
    
  }, [currentCategory]);

  const handleProductClick = (product: any) => {
    if (brand) {
      setBrnadnms(product.brand);
    } else {
      setBrand(product.catagori);
    }
  };

  return (
    <main className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">
      {/* 🔄 Loading State */}

   
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 p-4 animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 h-48"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
          {products.map((product: any) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleProductClick(product)}
              className="relative group rounded-xl overflow-hidden shadow-lg 
                bg-white dark:bg-zinc-900 cursor-pointer transition-all 
                border border-transparent hover:border-cyan-400 hover:shadow-cyan-400/50"
            >
              {/* Image Section */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={
                    product.img
                      ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/uploads_product/${product.img}`
                      : product.imglink           //this is a link img 
                  }
                  alt={product.brand || 'Product Image'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                
                
                 onClick={() => window.location.href = `/products/${currentCategory}/${product.catagori}/${product.brand}`}
                />
              </div>

              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-3">
                <h3 className="text-sm md:text-base font-semibold drop-shadow-lg">
                  {product.brand}
                </h3>
              
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}







// 'use client'

// import Head from 'next/head';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';

// import Api from '../../api/Api';

// import Link from 'next/link';



// export default function Home() {



//   const [products, setProducts] = useState<any[]>([]);
//   const [brand, setBrand] = useState('');
//   const [branNams, setBrnadnms] = useState('');
//   const [getBrand, setProducts_brand] = useState<any[]>([]);




  
// const [actions_new_old, setAction] =useState<string>('old');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const current = localStorage.getItem('oldOrNew');
//       if (current !== actions_new_old) {
//         setAction(current || 'old');
//       }
//     }, 1000); // প্রতি ১ সেকেন্ডে চেক করবে

//     return () => clearInterval(interval);
//   }, [actions_new_old]);






//   useEffect(() => {
//     const fetchData = () => {
//       getAllProducts();
//       getUserBrandName();
//       getUserBrandNameFinal();
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 3000);
//     return () => clearInterval(interval);
//   }, [actions_new_old]);

//   const getAllProducts = () => {
//     Api.get(`/get_all_product/${actions_new_old}`)
//       .then(res => {
//         if (!brand) {
//           setProducts(res.data.message);
        

//                   }
//       })
//       .catch(err => console.error('❌ Product load error:', err));
//   };

//   const getUserBrandName = () => {
//     Api.get(`/get_all_product_brandName/${brand}/${actions_new_old}`)
//       .then(res => {
//         setProducts_brand(res.data.message);
//         if (brand) setProducts(res.data.message);
//       })
//       .catch(err => console.error('❌ Brand get error:', err));
//   };

//   const getUserBrandNameFinal = () => {
//     if (!branNams) return;
//     Api.get(`/get_all_product_brandName_final/${brand}/${actions_new_old}/${branNams}`)
//       .then(res => {
//         setProducts_brand(res.data.message);
//       })
//       .catch(err => console.error('❌ Final brand category error:', err));
//   };

//   const handleProductClick = (product: any) => {
//     if (brand) {
//       setBrnadnms(product.brand);
//     } else {
//       setBrand(product.catagori);
//     }
//   };

//   return (
//     <>
    


//     <Head>
//       <title>home product</title>
//   <meta name="robots" content="index, follow" />
//   <meta name="language" content="bn" />
//   <meta name="author" content="বাংলা ই-কমার্স" />
//   <link rel="canonical" href="https://yourdomain.com" />
//   <link rel="alternate" hrefLang="bn" href="https://yourdomain.com" />
// </Head>




  



//       <main className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">

  

        




//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 p-4">
//       {products.map((product: any) => (
//         <motion.div
//           key={product.id}
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.97 }}
//           onClick={() => handleProductClick(product)}
//           className="relative group rounded-xl overflow-hidden shadow-md bg-white dark:bg-zinc-900 cursor-pointer transition-all"
//         >
//           {/* Image Section */}
//           <div className="aspect-square overflow-hidden">
//             <img
//               src={
//                 product.img
//                   ? `http://localhost:8000/uploads_product/${product.img}`
//                   : product.imglink
//               }
//               alt={product.name || 'Product Image'}
//               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//             />
//           </div>

//           {/* Overlay Text */}
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3">
//             <h3 className="text-sm md:text-base font-semibold">
//               {brand ? product.brand : product.catagori}
//             </h3>
//             <Link
//               href={`/product-view/${product.id}`}
//               className="text-xs text-cyan-300 underline"
//             >
//               বিস্তারিত দেখুন
//             </Link>
//           </div>
//         </motion.div>
//       ))}
//     </div>



   
//       </main>
//     </>
//   );
// }




// "use client";


        // <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-3">
        //   <Typewriter
        //     options={{
        //       strings: [
        //         'পণ্য লোড হচ্ছে...',
        //         'দয়া করে একটু অপেক্ষা করুন...',
        //         'সেরা পণ্যটি আনছি আপনার জন্য!',
        //       ],
        //       autoStart: true,
        //       loop: true,
        //       delay: 60,
        //     }}
        //   />
        // </h1>


// import { useEffect, useState, useRef } from "react";
// import { motion } from "framer-motion";
// import Api from "../../api/Api";

// export default function TopProductsPage({ actions_new_old = "new" }) {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const bagRef = useRef<HTMLDivElement>(null);
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     setLoading(true);
//     Api.get(`/get_all_product/${actions_new_old}`)
//       .then((res) => {
//         setProducts(res.data.message || []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching products:", err);
//         setLoading(false);
//       });
//   }, [actions_new_old]);

//   const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const item = e.currentTarget.getBoundingClientRect();
//     const bag = bagRef.current?.getBoundingClientRect();
//     if (!bag) return;

//     const flyingItem = document.createElement("div");
//     flyingItem.innerText = "🛍️";
//     flyingItem.style.position = "fixed";
//     flyingItem.style.left = `${item.left}px`;
//     flyingItem.style.top = `${item.top}px`;
//     flyingItem.style.fontSize = "32px";
//     flyingItem.style.zIndex = "9999";
//     flyingItem.style.transition = "transform 0.8s ease-in-out";
//     document.body.appendChild(flyingItem);

//     requestAnimationFrame(() => {
//       const dx = bag.left - item.left;
//       const dy = bag.top - item.top;
//       flyingItem.style.transform = `translate(${dx}px, ${dy}px) scale(0.5) rotate(360deg)`;
//     });

//     setTimeout(() => {
//       flyingItem.remove();
//       setCartCount((prev) => prev + 1);
//     }, 800);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">
//         Loading products...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 px-4 md:px-10 py-12">
//       <header className="flex items-center justify-between mb-8">
//         <h1 className="text-4xl font-extrabold text-yellow-400 neon-glow">
//           Top Products
//         </h1>

//         <div ref={bagRef} className="relative text-white cursor-pointer">
//           🛒
//           {cartCount > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
//               {cartCount}
//             </span>
//           )}
//         </div>
//       </header>

//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <motion.div
//             key={product.id}
//             whileHover={{ scale: 1.05 }}
//             className="relative rounded-xl overflow-hidden cursor-pointer shadow-lg"
//           >
//             {/* Lazy loading with shimmer */}
//             <div className="relative w-full h-48 bg-gray-700 overflow-hidden rounded-xl">
//               <img
//                 src={
//                   product.img
//                     ? `http://localhost:8000/uploads_product/${product.img}`
//                     : product.imglink
//                 }
//                 alt={product.name}
//                 className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
//                 loading="lazy"
//               />
//               <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 opacity-30" />
//             </div>

//             {/* Category / Name overlay */}
//             <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 py-2 text-center">
//               <h2 className="text-white font-bold text-sm sm:text-base neon-glow truncate">
//                 {product.name}
//               </h2>
//               <p className="text-yellow-300 text-xs sm:text-sm neon-glow truncate">
//                 {product.brand || "Unknown Category"}
//               </p>
//             </div>

//             {/* Add to cart button */}
//             <button
//               onClick={handleAddToCart}
//               className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-md font-semibold hover:bg-yellow-300 transition"
//             >
//               🛒
//             </button>
//           </motion.div>
//         ))}
//       </div>

//       <style jsx>{`
//         .neon-glow {
//           text-shadow: 0 0 5px #facc15, 0 0 10px #f59e0b, 0 0 20px #f97316;
//         }
//       `}</style>
//     </div>
//   );
// }

