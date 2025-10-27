




// app/products/[slug]/page.tsx
import { Metadata } from "next";

// 🟢 Product fetch (API থেকে আনবেন)
// async function getProduct(slug: string) {
//   const res = await fetch(`https://api.example.com/products/${slug}`, {
//     cache: "no-store",
//   });
//   if (!res.ok) throw new Error("Failed to fetch product");
//   return res.json

// আমাদের কোথায়   
const getProduct =[
  {id:3}
];
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {


  return {
    title: ` Best Price in Bangladesh`,
    // description: product.description?.slice(0, 160) || "Best product online",
    keywords: "product, ecommerce, online shop",
    openGraph: {
      title: 'TITLE.NAME',
      description: 'DRS',
      url: `https://myshop.com/products/${'3'}`,
      images:'IMGS',
    },
    twitter: {
      card: "summary_large_image",
      title: 'TIME',
      description: 'DFIS',
      images: 'IGMS',
    },
    alternates: {
      canonical: `https://myshop.com/products/${'43'}`,
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {


  return (
    <>
      {/* ✅ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: "Product",
            image: "Product",
            description: "Product",
            sku:"Product",
            brand: { "@type": "Brand", name:  "MyShop" },
            offers: {
              "@type": "Offer",
              url: `https://myshop.com/products/${`56`}`,
              priceCurrency: "BDT",
              price: "Product",
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
    </>
  );
}













// app/products/[id]/page.tsx
// import { Metadata } from 'next';
// import Image from 'next/image';
// import { ShoppingCart, Share2 } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Script from 'next/script';
// import React from 'react';

// interface Product {
//   id: string;
//   title: string;
//   desc: string;
//   price: number;
//   images: string[];
//   rating: number;
//   reviews: { user: string; text: string; rating: number }[];
// }




// // Sample Product Fetch
// const getProduct = (id: string): Product => ({
//   id,
//   title: 'Neon Gold Headphones',
//   desc: 'Premium headphones with immersive 3D sound and glowing neon design.',
//   price: 149.99,
//   images: ['/images/product-1.png', '/images/product-2.png', '/images/product-3.png'],
//   rating: 4.9,
//   reviews: [
//     { user: 'Alice', text: 'Amazing product!', rating: 5 },
//     { user: 'Bob', text: 'Loved the glow and design!', rating: 4 },
//   ],
// });

// // Metadata for SEO
// export function generateMetadata({ params }: { params: { id: string } }): Metadata {
//   const product = getProduct(params.id);
//   return {
//     title: `${product.title} | Neon Store`,
//     description: product.desc,
//     openGraph: {
//       title: product.title,
//       description: product.desc,
//       type: 'product',
//       images: product.images,
//       url: `https://my-neon-store.vercel.app/products/${product.id}`,
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: product.title,
//       description: product.desc,
//       images: product.images,
//     },
//   };
// }

// export default function ProductPage({ params }: { params: { id: string } }) {
// //   const product = getProduct(params.id);
// //   const [cartCount, setCartCount] = React.useState(0);
// //   const [selectedImage, setSelectedImage] = React.useState(0);

// //   const addToCart = () => setCartCount(cartCount + 1);
// //   const handleShare = () => {
// //     if (typeof navigator !== 'undefined' && navigator.share) {
// //       navigator.share({ title: product.title, url: window.location.href });
// //     } else if (typeof navigator !== 'undefined') {
// //       navigator.clipboard.writeText(window.location.href);
// //       alert('Link copied!');
// //     }
// //   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex flex-col p-6 md:p-12">
//       {/* JSON-LD for Google */}
//       <Script type="application/ld+json" id="product-jsonld">
//         {JSON.stringify({
//           '@context': 'https://schema.org/',
//           '@type': 'Product',
//           name: product.title,
//           image: product.images.map((img) => `https://my-neon-store.vercel.app${img}`),
//           description: product.desc,
//           sku: product.id,
//           offers: {
//             '@type': 'Offer',
//             priceCurrency: 'BDT',
//             price: product.price,
//             url: `https://my-neon-store.vercel.app/products/${product.id}`,
//             availability: 'https://schema.org/InStock',
//           },
//           aggregateRating: {
//             '@type': 'AggregateRating',
//             ratingValue: product.rating,
//             reviewCount: product.reviews.length,
//           },
//           review: product.reviews.map((r) => ({
//             '@type': 'Review',
//             author: r.user,
//             reviewBody: r.text,
//             reviewRating: { '@type': 'Rating', ratingValue: r.rating },
//           })),
//         })}
//       </Script>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Neon 3D Card */}
//         <motion.div
//           className="flex-1 flex justify-center perspective-1000"
//           animate={{ rotateY: [0, 10, -10, 0] }}
//           transition={{ duration: 6, repeat: Infinity }}
//         >
//           <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-yellow-400 to-pink-500 shadow-[0_0_50px_15px_rgba(255,215,0,0.7)] flex items-center justify-center hover:scale-105 transition-transform">
//             <div className="absolute inset-0 rounded-3xl border-4 border-yellow-400 animate-pulse"></div>
//             <Image
//             src={'jsdlfsdl.jpg'}
//               alt={'fjlsdf'}
//               width={300}
//               height={300}
//               className="object-contain"
//             />
//           </div>
//         </motion.div>

//         {/* Product Details */}
//         <div className="flex-1 flex flex-col gap-6">
//           <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
           
//           </h1>
        
//           <div className="flex gap-4 mt-4">
//             <button
         
//               className="bg-yellow-400 text-black px-6 py-3 rounded-full shadow-lg hover:scale-105 transition flex items-center gap-2"
//             >
//               <ShoppingCart size={20} /> Add to Cart 
//             </button>
//             <button
          
//               className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition flex items-center gap-2"
//             >
//               <Share2 size={20} /> Share
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







// 'use client';
// import { useState } from 'react';
// import Head from 'next/head';
// import { motion } from 'framer-motion';
// import { ShoppingCart, Share2 } from 'lucide-react';
// import Image from 'next/image';
// import { useRouter } from 'next/router';

// export default function ProductPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [cartCount, setCartCount] = useState(0);

//   const product = {
//     id: id || 'P-001',
//     title: 'Neon Gold Headphones',
//     price: 149.99,
//     desc: 'Premium headphones with immersive 3D sound and glowing neon design.',
//     images: [
//       '/images/product-1.png',
//       '/images/product-2.png',
//       '/images/product-3.png',
//     ],
//     rating: 4.9,
//     reviews: [
//       { user: 'Alice', text: 'Amazing product!', rating: 5 },
//       { user: 'Bob', text: 'Loved the glow and design!', rating: 4 },
//     ],
//   };

//   const addToCart = () => setCartCount(cartCount + 1);
//   const handleShare = () => {
//     if (navigator.share) navigator.share({ title: product.title, url: window.location.href });
//     else navigator.clipboard.writeText(window.location.href);
//   };

//   return (
//     <>
//       <Head>
//         <title>{product.title} | Neon Store</title>
//         <meta name="description" content={product.desc} />
//         <link rel="canonical" href={`https://my-neon-store.vercel.app/product/${product.id}`} />
//         <meta property="og:title" content={product.title} />
//         <meta property="og:description" content={product.desc} />
//         <meta property="og:image" content={product.images[0]} />
//         <meta property="og:type" content="product" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={product.title} />
//         <meta name="twitter:description" content={product.desc} />
//         <meta name="twitter:image" content={product.images[0]} />
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org/",
//               "@type": "Product",
//               name: product.title,
//               image: product.images,
//               description: product.desc,
//               sku: product.id,
//               offers: {
//                 "@type": "Offer",
//                 url: `https://my-neon-store.vercel.app/product/${product.id}`,
//                 priceCurrency: "BDT",
//                 price: product.price,
//                 availability: "https://schema.org/InStock",
//               },
//               aggregateRating: {
//                 "@type": "AggregateRating",
//                 ratingValue: product.rating,
//                 reviewCount: product.reviews.length,
//               },
//               review: product.reviews.map((r) => ({
//                 "@type": "Review",
//                 author: r.user,
//                 reviewBody: r.text,
//                 reviewRating: {
//                   "@type": "Rating",
//                   ratingValue: r.rating,
//                 },
//               })),
//             }),
//           }}
//         />
//       </Head>

//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex flex-col p-6 md:p-12">
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* 3D Neon Card */}
//           <motion.div
//             className="flex-1 flex justify-center perspective-1000"
//             animate={{ rotateY: [0, 10, -10, 0] }}
//             transition={{ duration: 6, repeat: Infinity }}
//           >
//             <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-yellow-400 to-pink-500 shadow-[0_0_50px_15px_rgba(255,215,0,0.7)] flex items-center justify-center">
//               <div className="absolute inset-0 rounded-3xl border-4 border-yellow-400 animate-pulse"></div>
//               <Image src={product.images[0]} alt={product.title} width={300} height={300} className="object-contain" />
//             </div>
//           </motion.div>

//           {/* Product Details */}
//           <div className="flex-1 flex flex-col gap-6">
//             <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
//               {product.title}
//             </h1>
//             <p className="text-gray-300">{product.desc}</p>
//             <p className="text-yellow-400 text-xl font-semibold">৳ {product.price.toFixed(2)}</p>
//             <div className="flex gap-4 mt-4">
//               <button
//                 onClick={addToCart}
//                 className="bg-yellow-400 text-black px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
//               >
//                 <ShoppingCart size={20} /> Add to Cart ({cartCount})
//               </button>
//               <button
//                 onClick={handleShare}
//                 className="bg-pink-500 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
//               >
//                 <Share2 size={20} /> Share
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
