


import React from 'react'

export default function Seo() {
  return (
    <div>
      Seo page
    </div>
  )
}

// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import Script from 'next/script';






// // export const metadata: Metadata = {
// //   title: "My-shopings.com – Best Online Store in Bangladesh",
// //   description: "আমাদের ইকমার্সে পাবেন সেরা মানের পণ্য সাশ্রয়ী দামে। Fast Delivery, Secure Payment এবং ২৪/৭ কাস্টমার সার্পোট।",
// //   keywords: ["Ecommerce", "Online Shop", "Bangladesh", "Buy Products", "Best Price"],
// //   openGraph: {
// //     title: "My Shop – Best Online Store in Bangladesh",
// //     description: "আমাদের ইকমার্সে পাবেন সেরা মানের পণ্য সাশ্রয়ী দামে।",
// //     url: "https://www.my-shopings.com",
// //     siteName: "my-shopings.com/home page",
// //     images: [
// //       {
// //         url: "https://www.myshop.com/og-image.jpg",
// //         width: 1200,
// //         height: 630,
// //         alt: "My Shop Banner",
// //       },
// //     ],
// //     locale: "BD",
// //     type: "website",
// //   },
// //   alternates: {
// //     canonical: "https://www.my-shopings.com",
// //   },
// // };






// // ✅ Build-safe SEO Metadata (Vercel friendly)
// export const metadata: Metadata =({param})=>{
//   try {
//     const res = await fetch(`https://fakestoreapi.com/products/${params.id}`, {
//       next: { revalidate: 60 },
//     });
//     const product = await res.json();

//     return {
//       title: `${product.title} | ${product.price} টাকা | অনলাইন শপ`,
//       description: `${product.title} এখন মাত্র ${product.price} টাকায়। দ্রুত ডেলিভারি, সেরা মান ও গ্রাহক রিভিউ সহ!`,
//       keywords: `${product.title}, অনলাইন কেনাকাটা, প্রোডাক্ট, বাংলাদেশ, সেরা দাম`,
//       openGraph: {
//         title: product.title,
//         description: `${product.title} এখন মাত্র ${product.price} টাকায়`,
//         url: `https://yourwebsite.com/product/${params.id}`,
//         images: [{ url: product.image }],
//         locale: 'bn_BD',
//         type: 'product',
//       },
//       alternates: {
//         canonical: `https://yourwebsite.com/product/${params.id}`,
//       },
//     };
//   } catch {
//     return {
//       title: 'পণ্য পাওয়া যায়নি | অনলাইন শপ',
//       description: 'এই পণ্যের তথ্য পাওয়া যায়নি। পরে আবার চেষ্টা করুন।',
//     };
//   }
// }

// export default function ProductPage({ params }: any) {
//   const [product, setProduct] = useState<any>(null);
//   const [related, setRelated] = useState<any[]>([]);
//   const [reviews, setReviews] = useState<any[]>([]);
//   const [form, setForm] = useState({ name: '', rating: 5, comment: '' });
//   const [error, setError] = useState<string | null>(null);

//   // ✅ Runtime safe fetch (Vercel safe)
//   useEffect(() => {
//     const loadProduct = async () => {
//       try {
//         const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
//         if (!res.ok) throw new Error('Failed to fetch product');
//         const data = await res.json();
//         setProduct(data);

//         const relRes = await fetch(`https://fakestoreapi.com/products/category/${data.category}`);
//         const relData = await relRes.json();
//         setRelated(relData.filter((p: any) => p.id !== data.id).slice(0, 4));
//       } catch (err) {
//         setError('পণ্য লোড করা যায়নি। পরে আবার চেষ্টা করুন।');
//       }
//     };
//     loadProduct();
//   }, [params.id]);

//   // ✅ Review Submit
//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     if (!form.name || !form.comment) return alert('নাম ও মন্তব্য লিখুন!');
//     setReviews((prev) => [...prev, form]);
//     setForm({ name: '', rating: 5, comment: '' });
//   };

//   if (error)
//     return <p className="text-center mt-10 text-red-600 font-semibold">{error}</p>;
//   if (!product)
//     return <p className="text-center mt-10 text-gray-500 animate-pulse">🔄 লোড হচ্ছে...</p>;

//   return (
//     <div className="max-w-6xl mx-auto p-4 space-y-10">
//       {/* ✅ JSON-LD Structured Data */}
//       <Script
//         id="product-schema"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify({
//             '@context': 'https://schema.org/',
//             '@type': 'Product',
//             name: product.title,
//             image: [product.image],
//             description: product.description,
//             brand: { '@type': 'Brand', name: 'R Brand' },
//             offers: {
//               '@type': 'Offer',
//               priceCurrency: 'BDT',
//               price: product.price,
//               availability: 'https://schema.org/InStock',
//               url: `https://yourwebsite.com/product/${params.id}`,
//             },
//             aggregateRating: {
//               '@type': 'AggregateRating',
//               ratingValue: product.rating?.rate || '4.9',
//               reviewCount: (product.rating?.count || 90) + reviews.length,
//             },
//             review: reviews.map((r) => ({
//               '@type': 'Review',
//               author: { '@type': 'Person', name: r.name },
//               reviewBody: r.comment,
//               reviewRating: { '@type': 'Rating', ratingValue: r.rating },
//             })),
//           }),
//         }}
//       />

//       {/* 🔹 Product Details */}
//       <motion.div
//         className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <div className="grid md:grid-cols-2 gap-8 items-center">
//           <Image
//             src={product.image}
//             alt={product.title}
//             width={450}
//             height={450}
//             className="rounded-xl object-contain mx-auto"
//           />

//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
//               {product.title}
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
//             <div className="flex items-center mb-3">
//               <span className="text-yellow-400 text-lg">⭐</span>
//               <span className="ml-1 text-gray-700 dark:text-gray-200">
//                 {product.rating?.rate} ({product.rating?.count + reviews.length} রিভিউ)
//               </span>
//             </div>
//             <p className="text-3xl font-semibold text-green-600 mb-6">
//               ৳ {product.price}
//             </p>
//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
//             >
//               🛒 এখনই অর্ডার করুন
//             </motion.button>
//           </div>
//         </div>
//       </motion.div>

//       {/* 🔹 Review Section */}
//       <motion.div
//         className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
//           গ্রাহক রিভিউ
//         </h2>

//         {/* Review List */}

//         {reviews.length > 0 ? (
//           <div className="space-y-3 mb-6">
//             {reviews.map((r, i) => (
//               <div key={i} className="p-3 rounded-lg bg-white dark:bg-gray-900 shadow">
//                 <p className="font-bold text-gray-800 dark:text-gray-100">{r.name}</p>
//                 <p className="text-yellow-400">⭐ {r.rating}</p>
//                 <p className="text-gray-600 dark:text-gray-300 mt-1">{r.comment}</p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 mb-6">এখনও কোনো রিভিউ নেই। প্রথম রিভিউ দিন!</p>
//         )}

//         {/* Review Form */}
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <input
//             type="text"
//             placeholder="আপনার নাম"
//             className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//           />
//           <select
//             className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//             value={form.rating}
//             onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
//           >
//             {[5, 4, 3, 2, 1].map((r) => (
//               <option key={r} value={r}>
//                 ⭐ {r} রেটিং
//               </option>
//             ))}
//           </select>
//           <textarea
//             placeholder="আপনার মন্তব্য..."
//             className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//             rows={3}
//             value={form.comment}
//             onChange={(e) => setForm({ ...form, comment: e.target.value })}
//           />
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:bg-green-700"
//           >
//             ✍️ রিভিউ জমা দিন
//           </motion.button>
//         </form>
//       </motion.div>

//       {/* 🔹 Related Products */}
//       {related.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
//             সংশ্লিষ্ট পণ্যসমূহ
//           </h2>
//           <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
//             {related.map((item) => (
//               <motion.a
//                 key={item.id}
//                 href={`/product/${item.id}`}
//                 whileHover={{ scale: 1.03 }}
//                 className="bg-white dark:bg-gray-900 rounded-xl shadow p-3 hover:shadow-lg transition"
//               >
//                 <Image
//                   src={item.image}
//                   alt={item.title}
//                   width={200}
//                   height={200}
//                   className="object-contain h-40 w-full rounded-lg"
//                 />
//                 <h3 className="text-sm font-semibold mt-2 text-gray-700 dark:text-gray-200 line-clamp-2">
//                   {item.title}
//                 </h3>
//                 <p className="text-green-600 font-bold mt-1">৳ {item.price}</p>
//               </motion.a>
//             ))}
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// }
