import React from 'react'

export default function page() {
  return (
    <div>product page</div>
  )
}







// Seo













// ChatGPT said:

// ঠিক আছে! আমরা Next.js এর জন্য সম্পূর্ণ Product + Category SEO setup বানাবো। এতে থাকবে:

// Dynamic meta tags (title, description, canonical)

// Open Graph / Twitter Cards (social share জন্য)

// JSON-LD structured data (Google rich results এর জন্য)

// Category-wise SEO optimization

// উদাহরণ: pages/product/[slug].tsx
// "use client";
// import { useEffect } from "react";
// import Head from "next/head";
// import Api from "../../api/Api";

// type Product = {
//   id: number;
//   name: string;
//   slug: string;
//   description: string;
//   category: { id: number; name: string; slug: string };
//   price: number;
//   image: string;
// };

// export default function ProductPage({ params }: { params: { slug: string } }) {
//   const [product, setProduct] = React.useState<Product | null>(null);

//   useEffect(() => {
//     Api.get(`/product/${params.slug}`).then((res) => setProduct(res.data));
//   }, [params.slug]);

//   if (!product) return <div>Loading...</div>;

//   const jsonLd = {
//     "@context": "https://schema.org/",
//     "@type": "Product",
//     name: product.name,
//     image: [product.image],
//     description: product.description,
//     sku: product.id,
//     brand: { "@type": "Brand", name: "YourBrandName" },
//     offers: {
//       "@type": "Offer",
//       url: `https://yourdomain.com/product/${product.slug}`,
//       priceCurrency: "USD",
//       price: product.price,
//       availability: "https://schema.org/InStock",
//     },
//   };

//   return (
//     <>
//       <Head>
//         <title>{product.name} | Your Shop Name</title>
//         <meta name="description" content={product.description} />
//         <link rel="canonical" href={`https://yourdomain.com/product/${product.slug}`} />
//         {/* Open Graph */}
//         <meta property="og:title" content={product.name} />
//         <meta property="og:description" content={product.description} />
//         <meta property="og:image" content={product.image} />
//         <meta property="og:type" content="product" />
//         <meta property="og:url" content={`https://yourdomain.com/product/${product.slug}`} />
//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={product.name} />
//         <meta name="twitter:description" content={product.description} />
//         <meta name="twitter:image" content={product.image} />
//         {/* JSON-LD */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//         />
//       </Head>

//       <main className="max-w-5xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//         <img src={product.image} className="w-full max-w-md mb-4" />
//         <p className="mb-2">{product.description}</p>
//         <p className="font-bold text-lg">Price: ${product.price}</p>
//         <p className="mt-2 text-sm text-gray-500">
//           Category: {product.category.name}
//         </p>
//       </main>
//     </>
//   );
// }

// উদাহরণ: pages/category/[slug].tsx
// "use client";
// import Head from "next/head";
// import Api from "../../api/Api";
// import Link from "next/link";

// export default function CategoryPage({ params }: { params: { slug: string } }) {
//   const [category, setCategory] = React.useState<any>(null);
//   const [products, setProducts] = React.useState<any[]>([]);

//   React.useEffect(() => {
//     Api.get(`/category/${params.slug}`).then((res) => {
//       setCategory(res.data.category);
//       setProducts(res.data.products);
//     });
//   }, [params.slug]);

//   if (!category) return <div>Loading...</div>;

//   return (
//     <>
//       <Head>
//         <title>{category.name} Products | Your Shop Name</title>
//         <meta
//           name="description"
//           content={`Explore the best ${category.name} products in our store.`}
//         />
//         <link rel="canonical" href={`https://yourdomain.com/category/${category.slug}`} />
//         {/* Open Graph */}
//         <meta property="og:title" content={`${category.name} Products`} />
//         <meta
//           property="og:description"
//           content={`Explore the best ${category.name} products in our store.`}
//         />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={`https://yourdomain.com/category/${category.slug}`} />
//       </Head>

//       <main className="max-w-5xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6">{category.name} Products</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {products.map((p) => (
//             <Link key={p.id} href={`/product/${p.slug}`}>
//               <div className="border rounded p-3 hover:shadow-lg transition-shadow">
//                 <img src={p.image} className="w-full h-48 object-cover mb-2" />
//                 <h2 className="font-bold">{p.name}</h2>
//                 <p className="text-sm text-gray-600">${p.price}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </main>
//     </>
//   );
// }


// ✅ এই কোডের সুবিধা:

// প্রতিটি product page dynamic SEO meta + JSON-LD সাথে।

// প্রতিটি category page dynamic SEO + Open Graph।

// Google rich results + social share সম্পূর্ণ compatible।

// আমি চাইলে এটা আরও auto sitemap generation + robots.txt সহ ready বানিয়ে দিতে পারি।

// চাও কি আমি সেটা বানাই?
















// ঠিক আছে! আমরা robots.txt + Google Search Console setupও দিবো যাতে Google সব page ঠিকমতো index করতে পারে।

// 1️⃣ robots.txt (Next.js)

// public/robots.txt ফাইল তৈরি করো:

// User-agent: *
// Disallow: /admin/
// Disallow: /login/
// Allow: /

// Sitemap: https://yourdomain.com/sitemap.xml


// ✅ ব্যাখ্যা:

// /admin/ ও /login/ index হবে না।

// বাকি সব page allow।

// Sitemap URL উল্লেখ আছে যা Google auto fetch করবে।

// 2️⃣ Google Search Console

// Google Search Console এ লগইন করো।

// Add Property → আপনার ডোমেইন যোগ করো।

// Verification → HTML tag, DNS, বা Google Analytics দিয়ে verify করো।

// Sitemap Submit → https://yourdomain.com/sitemap.xml submit করো।

// Google auto crawl & index শুরু করবে।

// 3️⃣ Optional: Next.js meta tags auto

// প্রতিটি page-এ dynamic meta থাকলে (যেমন আগে category page-এ করেছি) → Google rich snippet & SEO improve হবে।

// আমি চাইলে তোমার জন্য complete product + category SEO setup + JSON-LD structured data একদম ready বানিয়ে দিতে পারি, যাতে Google আরও ভালো বুঝে।

// চাও কি আমি সেটা বানাই?







// // app/sitemap.ts
// import Api from "@/api/Api";

// export default async function sitemap() {
//   const staticPages = [
//     { url: "/", lastModified: new Date() },
//     { url: "/about", lastModified: new Date() },
//     { url: "/contact", lastModified: new Date() },
//   ];

//   let categories: { slug: string }[] = [];
//   let products: { slug: string; updated_at: string }[] = [];

//   try {
//     const catRes = await Api.get("/categories");
//     categories = catRes.data;

//     const prodRes = await Api.get("/products");
//     products = prodRes.data;
//   } catch (err) {
//     console.error(err);
//   }

//   const categoryPages = categories.map((cat) => ({
//     url: `/category/${cat.slug}`,
//     lastModified: new Date().toISOString(),
//   }));

//   const productPages = products.map((prod) => ({
//     url: `/product/${prod.slug}`,
//     lastModified: prod.updated_at,
//   }));

//   return [...staticPages, ...categoryPages, ...productPages];
// }




















// // app/product/[slug]/page.tsx
// import React from "react";
// import { Metadata } from "next";
// import Api from "@/api/Api";

// type ProductPageProps = {
//   params: { slug: string };
// };

// export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
//   let product: { name: string; description: string; price: number; image: string } = {
//     name: "",
//     description: "",
//     price: 0,
//     image: "",
//   };

//   try {
//     const res = await Api.get(`/product/${params.slug}`);
//     product = res.data;
//   } catch (err) {
//     product = {
//       name: params.slug,
//       description: `Details about ${params.slug}`,
//       price: 0,
//       image: "/placeholder.png",
//     };
//   }

//   return {
//     title: `${product.name} - Buy Online | MyStore`,
//     description: product.description,
//     keywords: `${product.name}, buy ${product.name}, online store, products`,
//     openGraph: {
//       title: `${product.name} - Buy Online | MyStore`,
//       description: product.description,
//       type: "product",
//       url: `https://yourdomain.com/product/${params.slug}`,
//       images: [product.image],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `${product.name} - Buy Online | MyStore`,
//       description: product.description,
//       images: [product.image],
//     },
//   };
// }

// export default async function ProductPage({ params }: ProductPageProps) {
//   let product: { name: string; description: string; price: number; image: string } = {
//     name: "",
//     description: "",
//     price: 0,
//     image: "/placeholder.png",
//   };

//   try {
//     const res = await Api.get(`/product/${params.slug}`);
//     product = res.data;
//   } catch (err) {}

//   const structuredData = {
//     "@context": "https://schema.org",
//     "@type": "Product",
//     name: product.name,
//     image: [product.image],
//     description: product.description,
//     sku: params.slug,
//     offers: {
//       "@type": "Offer",
//       url: `https://yourdomain.com/product/${params.slug}`,
//       priceCurrency: "USD",
//       price: product.price,
//       availability: "https://schema.org/InStock",
//     },
//   };

//   return (
//     <div className="min-h-screen p-4 sm:p-6 max-w-6xl mx-auto bg-gray-50">
//       {/* JSON-LD */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-auto rounded-lg shadow-lg"
//           />
//         </div>

//         <div className="flex flex-col justify-center">
//           <h1 className="text-3xl font-extrabold mb-4">{product.name}</h1>
//           <p className="text-gray-700 mb-4">{product.description}</p>
//           <p className="text-yellow-600 font-bold text-2xl mb-4">${product.price}</p>
//           <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold transition">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
















// // app/category/[slug]/page.tsx
// import React from "react";
// import { Metadata } from "next";
// import Api from "@/api/Api";

// type CategoryPageProps = {
//   params: { slug: string };
// };

// export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
//   // API থেকে category data আন
//   let category: { name: string; description: string } = { name: "", description: "" };
//   try {
//     const res = await Api.get(`/category/${params.slug}`);
//     category = res.data;
//   } catch (err) {
//     category = { name: params.slug, description: `Explore our products in ${params.slug} category.` };
//   }

//   return {
//     title: `${category.name} - Shop | MyStore`,
//     description: category.description,
//     openGraph: {
//       title: `${category.name} - Shop | MyStore`,
//       description: category.description,
//       type: "website",
//       url: `https://yourdomain.com/category/${params.slug}`,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `${category.name} - Shop | MyStore`,
//       description: category.description,
//     },
//   };
// }

// export default async function CategoryPage({ params }: CategoryPageProps) {
//   // Products fetch
//   let products: Array<{ id: number; name: string; price: number; image: string }> = [];
//   try {
//     const res = await Api.get(`/products?category=${params.slug}`);
//     products = res.data;
//   } catch (err) {
//     products = [];
//   }

//   return (
//     <div className="min-h-screen p-4 sm:p-6 max-w-7xl mx-auto">
//       <h1 className="text-2xl sm:text-3xl font-bold mb-4 capitalize">{params.slug}</h1>
//       <p className="text-gray-600 mb-6">
//         Explore our products in <span className="font-semibold">{params.slug}</span> category.
//       </p>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//         {products.length ? (
//           products.map((p) => (
//             <div
//               key={p.id}
//               className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 flex flex-col"
//             >
//               <img src={p.image} alt={p.name} className="w-full h-40 object-cover mb-2 rounded" />
//               <h2 className="text-sm sm:text-base font-semibold">{p.name}</h2>
//               <p className="text-yellow-600 font-bold mt-1">${p.price}</p>
//             </div>
//           ))
//         ) : (
//           <div className="text-gray-500 col-span-full text-center py-10">
//             No products found in this category.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

























// 🔹 এখানে কি যোগ করা হলো:

// Dynamic Meta Tags – title, description, keywords।

// OpenGraph + Twitter card – social sharing জন্য।

// Structured Data (JSON-LD) – Google এ rich snippets জন্য।

// Responsive product grid।

// এই setup দিয়ে প্রতিটি ক্যাটাগরি পেজ SEO-optimized হবে।

// আমি চাইলে প্রোডাক্ট individual page এর জন্যও সম্পূর্ণ SEO + JSON-LD বানিয়ে দিতে পারি, যা Google এ আরো ভালো rich result দেয়।

// চাও কি সেটা বানাই?

// You said:
// ok
// ChatGPT said:

// চল, এবার আমরা প্রোডাক্ট individual page এর জন্য সম্পূর্ণ SEO setup করব। এতে থাকবে:

// Dynamic title ও description

// Meta keywords

// OpenGraph + Twitter card

// JSON-LD structured data (Product schema)

// Mobile responsive layout

// // app/product/[slug]/page.tsx
// import React from "react";
// import { Metadata } from "next";
// import Api from "@/api/Api";

// type ProductPageProps = {
//   params: { slug: string };
// };

// export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
//   let product: { name: string; description: string; price: number; image: string } = {
//     name: "",
//     description: "",
//     price: 0,
//     image: "",
//   };

//   try {
//     const res = await Api.get(`/product/${params.slug}`);
//     product = res.data;
//   } catch (err) {
//     product = {
//       name: params.slug,
//       description: `Details about ${params.slug}`,
//       price: 0,
//       image: "/placeholder.png",
//     };
//   }

//   return {
//     title: `${product.name} - Buy Online | MyStore`,
//     description: product.description,
//     keywords: `${product.name}, buy ${product.name}, online store, products`,
//     openGraph: {
//       title: `${product.name} - Buy Online | MyStore`,
//       description: product.description,
//       type: "product",
//       url: `https://yourdomain.com/product/${params.slug}`,
//       images: [product.image],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `${product.name} - Buy Online | MyStore`,
//       description: product.description,
//       images: [product.image],
//     },
//   };
// }

// export default async function ProductPage({ params }: ProductPageProps) {
//   let product: { name: string; description: string; price: number; image: string } = {
//     name: "",
//     description: "",
//     price: 0,
//     image: "/placeholder.png",
//   };

//   try {
//     const res = await Api.get(`/product/${params.slug}`);
//     product = res.data;
//   } catch (err) {}

//   const structuredData = {
//     "@context": "https://schema.org",
//     "@type": "Product",
//     name: product.name,
//     image: [product.image],
//     description: product.description,
//     sku: params.slug,
//     offers: {
//       "@type": "Offer",
//       url: `https://yourdomain.com/product/${params.slug}`,
//       priceCurrency: "USD",
//       price: product.price,
//       availability: "https://schema.org/InStock",
//     },
//   };

//   return (
//     <div className="min-h-screen p-4 sm:p-6 max-w-6xl mx-auto bg-gray-50">
//       {/* JSON-LD */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-auto rounded-lg shadow-lg"
//           />
//         </div>

//         <div className="flex flex-col justify-center">
//           <h1 className="text-3xl font-extrabold mb-4">{product.name}</h1>
//           <p className="text-gray-700 mb-4">{product.description}</p>
//           <p className="text-yellow-600 font-bold text-2xl mb-4">${product.price}</p>
//           <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold transition">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// 🔹 Key Features:

// SEO meta: Title, description, keywords dynamic।

// Social meta: OpenGraph & Twitter card।

// Structured Data: Product schema for rich results।

// Responsive layout: Mobile & desktop ready।

// এভাবে Google, Facebook, Twitter সব জায়গায় প্রোডাক্ট page SEO optimized হবে।

// চাও আমি এটা Category + Product এর জন্য একসাথে dynamic sitemap ও বানিয়ে দেই, যাতে Google auto index করে?

// You said:
// ok
// ChatGPT said:

// ঠিক আছে। আমরা এখন একটি dynamic sitemap + category & product SEO setup বানাবো, যাতে Google auto index করতে পারে।

// 1️⃣ Dynamic Sitemap (Next.js app/sitemap.tsx)
// // app/sitemap.ts
// import Api from "@/api/Api";

// export default async function sitemap() {
//   const staticPages = [
//     { url: "/", lastModified: new Date() },
//     { url: "/about", lastModified: new Date() },
//     { url: "/contact", lastModified: new Date() },
//   ];

//   let categories: { slug: string }[] = [];
//   let products: { slug: string; updated_at: string }[] = [];

//   try {
//     const catRes = await Api.get("/categories");
//     categories = catRes.data;

//     const prodRes = await Api.get("/products");
//     products = prodRes.data;
//   } catch (err) {
//     console.error(err);
//   }

//   const categoryPages = categories.map((cat) => ({
//     url: `/category/${cat.slug}`,
//     lastModified: new Date().toISOString(),
//   }));

//   const productPages = products.map((prod) => ({
//     url: `/product/${prod.slug}`,
//     lastModified: prod.updated_at,
//   }));

//   return [...staticPages, ...categoryPages, ...productPages];
// }


// ✅ এই sitemap Google ও অন্যান্য search engine ব্যবহার করতে পারবে।

// 2️⃣ Dynamic Category SEO Page
// // app/category/[slug]/page.tsx
// import React from "react";
// import { Metadata } from "next";
// import Api from "@/api/Api";

// export async function generateMetadata({ params }): Promise<Metadata> {
//   let category: { name: string; description: string } = { name: "", description: "" };

//   try {
//     const res = await Api.get(`/category/${params.slug}`);
//     category = res.data;
//   } catch (err) {}

//   return {
//     title: `${category.name} - Products | MyStore`,
//     description: category.description,
//     keywords: `${category.name}, ${category.name} products, buy online`,
//     openGraph: {
//       title: `${category.name} - Products | MyStore`,
//       description: category.description,
//       type: "website",
//       url: `https://yourdomain.com/category/${params.slug}`,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `${category.name} - Products | MyStore`,
//       description: category.description,
//     },
//   };
// }

// export default async function CategoryPage({ params }) {
//   let category: { name: string; description: string } = { name: "", description: "" };
//   let products: { name: string; slug: string; price: number; image: string }[] = [];

//   try {
//     const res = await Api.get(`/category/${params.slug}`);
//     category = res.data.category;
//     products = res.data.products;
//   } catch (err) {}

//   return (
//     <div className="min-h-screen p-4 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
//       <p className="text-gray-700 mb-6">{category.description}</p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {products.map((prod) => (
//           <div key={prod.slug} className="border rounded-lg overflow-hidden shadow">
//             <img src={prod.image} alt={prod.name} className="w-full h-48 object-cover" />
//             <div className="p-4">
//               <h2 className="font-bold text-lg">{prod.name}</h2>
//               <p className="text-yellow-600 font-bold">${prod.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// 🔹 Summary

// sitemap.ts → সব static, category, product pages auto include।

// category/[slug]/page.tsx → SEO optimized, dynamic meta।

// product/[slug]/page.tsx → Already done, structured data included।

// Mobile & desktop responsive।

// আমি চাইলে এই setup এর জন্য robots.txt এবং Google Search Console config ও দিতে পারি, যাতে সব ঠিকভাবে index হয়।

// চাও কি সেটাও বানাই?

// You said:
// ok
// ChatGPT said:

// ঠিক আছে! আমরা robots.txt + Google Search Console setupও দিবো যাতে Google সব page ঠিকমতো index করতে পারে।

// 1️⃣ robots.txt (Next.js)

// public/robots.txt ফাইল তৈরি করো:

// User-agent: *
// Disallow: /admin/
// Disallow: /login/
// Allow: /

// Sitemap: https://yourdomain.com/sitemap.xml


// ✅ ব্যাখ্যা:

// /admin/ ও /login/ index হবে না।

// বাকি সব page allow।

// Sitemap URL উল্লেখ আছে যা Google auto fetch করবে।

// 2️⃣ Google Search Console

// Google Search Console এ লগইন করো।

// Add Property → আপনার ডোমেইন যোগ করো।

// Verification → HTML tag, DNS, বা Google Analytics দিয়ে verify করো।

// Sitemap Submit → https://yourdomain.com/sitemap.xml submit করো।

// Google auto crawl & index শুরু করবে।

// 3️⃣ Optional: Next.js meta tags auto

// প্রতিটি page-এ dynamic meta থাকলে (যেমন আগে category page-এ করেছি) → Google rich snippet & SEO improve হবে।

// আমি চাইলে তোমার জন্য complete product + category SEO setup + JSON-LD structured data একদম ready বানিয়ে দিতে পারি, যাতে Google আরও ভালো বুঝে।

// চাও কি আমি সেটা বানাই?

// You said:
// ok
// ChatGPT said:

// ঠিক আছে! আমরা Next.js এর জন্য সম্পূর্ণ Product + Category SEO setup বানাবো। এতে থাকবে:

// Dynamic meta tags (title, description, canonical)

// Open Graph / Twitter Cards (social share জন্য)

// JSON-LD structured data (Google rich results এর জন্য)

// Category-wise SEO optimization

// উদাহরণ: pages/product/[slug].tsx
// "use client";
// import { useEffect } from "react";
// import Head from "next/head";
// import Api from "../../api/Api";

// type Product = {
//   id: number;
//   name: string;
//   slug: string;
//   description: string;
//   category: { id: number; name: string; slug: string };
//   price: number;
//   image: string;
// };

// export default function ProductPage({ params }: { params: { slug: string } }) {
//   const [product, setProduct] = React.useState<Product | null>(null);

//   useEffect(() => {
//     Api.get(`/product/${params.slug}`).then((res) => setProduct(res.data));
//   }, [params.slug]);

//   if (!product) return <div>Loading...</div>;

//   const jsonLd = {
//     "@context": "https://schema.org/",
//     "@type": "Product",
//     name: product.name,
//     image: [product.image],
//     description: product.description,
//     sku: product.id,
//     brand: { "@type": "Brand", name: "YourBrandName" },
//     offers: {
//       "@type": "Offer",
//       url: `https://yourdomain.com/product/${product.slug}`,
//       priceCurrency: "USD",
//       price: product.price,
//       availability: "https://schema.org/InStock",
//     },
//   };

//   return (
//     <>
//       <Head>
//         <title>{product.name} | Your Shop Name</title>
//         <meta name="description" content={product.description} />
//         <link rel="canonical" href={`https://yourdomain.com/product/${product.slug}`} />
//         {/* Open Graph */}
//         <meta property="og:title" content={product.name} />
//         <meta property="og:description" content={product.description} />
//         <meta property="og:image" content={product.image} />
//         <meta property="og:type" content="product" />
//         <meta property="og:url" content={`https://yourdomain.com/product/${product.slug}`} />
//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={product.name} />
//         <meta name="twitter:description" content={product.description} />
//         <meta name="twitter:image" content={product.image} />
//         {/* JSON-LD */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//         />
//       </Head>

//       <main className="max-w-5xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//         <img src={product.image} className="w-full max-w-md mb-4" />
//         <p className="mb-2">{product.description}</p>
//         <p className="font-bold text-lg">Price: ${product.price}</p>
//         <p className="mt-2 text-sm text-gray-500">
//           Category: {product.category.name}
//         </p>
//       </main>
//     </>
//   );
// }

// উদাহরণ: pages/category/[slug].tsx
// "use client";
// import Head from "next/head";
// import Api from "../../api/Api";
// import Link from "next/link";

// export default function CategoryPage({ params }: { params: { slug: string } }) {
//   const [category, setCategory] = React.useState<any>(null);
//   const [products, setProducts] = React.useState<any[]>([]);

//   React.useEffect(() => {
//     Api.get(`/category/${params.slug}`).then((res) => {
//       setCategory(res.data.category);
//       setProducts(res.data.products);
//     });
//   }, [params.slug]);

//   if (!category) return <div>Loading...</div>;

//   return (
//     <>
//       <Head>
//         <title>{category.name} Products | Your Shop Name</title>
//         <meta
//           name="description"
//           content={`Explore the best ${category.name} products in our store.`}
//         />
//         <link rel="canonical" href={`https://yourdomain.com/category/${category.slug}`} />
//         {/* Open Graph */}
//         <meta property="og:title" content={`${category.name} Products`} />
//         <meta
//           property="og:description"
//           content={`Explore the best ${category.name} products in our store.`}
//         />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={`https://yourdomain.com/category/${category.slug}`} />
//       </Head>

//       <main className="max-w-5xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6">{category.name} Products</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {products.map((p) => (
//             <Link key={p.id} href={`/product/${p.slug}`}>
//               <div className="border rounded p-3 hover:shadow-lg transition-shadow">
//                 <img src={p.image} className="w-full h-48 object-cover mb-2" />
//                 <h2 className="font-bold">{p.name}</h2>
//                 <p className="text-sm text-gray-600">${p.price}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </main>
//     </>
//   );
// }


// ✅ এই কোডের সুবিধা:

// প্রতিটি product page dynamic SEO meta + JSON-LD সাথে।

// প্রতিটি category page dynamic SEO + Open Graph।

// Google rich results + social share সম্পূর্ণ compatible।

// আমি চাইলে এটা আরও auto sitemap generation + robots.txt সহ ready বানিয়ে দিতে পারি।

// চাও কি আমি সেটা বানাই?

// You said:
// ok
// ChatGPT said:

// ঠিক আছে! আমি তোমার জন্য Next.js প্রোডাক্ট ও ক্যাটেগরি SEO সহ সম্পূর্ণ sitemap এবং robots.txt সেটআপ তৈরি করছি।

// 1️⃣ Sitemap Generation

// next-sitemap ব্যবহার করে তৈরি করা সহজ।

// Install:

// npm install next-sitemap


// next-sitemap.config.js:

// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   siteUrl: 'https://yourdomain.com',
//   generateRobotsTxt: true,
//   sitemapSize: 7000,
//   changefreq: 'daily',
//   priority: 0.7,
//   exclude: ['/admin/*'],
// };


// package.json scripts:

// {
//   "scripts": {
//     "postbuild": "next-sitemap"
//   }
// }


// Build করার পর sitemap.xml এবং robots.txt অটোমেটিক জেনারেট হবে।

// 2️⃣ Dynamic Product & Category SEO (Already Done)

// Product page: pages/product/[slug].tsx

// Category page: pages/category/[slug].tsx

// ✅ প্রতিটি page এর জন্য:

// <title> & <meta description> dynamic

// Open Graph + Twitter Card

// JSON-LD structured data (product page)

// Canonical URL

// 3️⃣ Robots.txt

// next-sitemap auto generate করবে /robots.txt।
// উদাহরণ:

// User-agent: *
// Allow: /
// Sitemap: https://yourdomain.com/sitemap.xml

// 4️⃣ Deployment Notes

// Build:

// npm run build


// Sitemap + robots.txt generate:

// npm run postbuild


// Deploy on Vercel/Netlify/etc.

// 💡 টিপস:

// প্রোডাক্ট এবং ক্যাটেগরি slug অবশ্যই unique হতে হবে।

// প্রতিটি image URL অবশ্যই absolute URL ব্যবহার করুন।

// Sitemap বড় হলে sitemapSize adjust করতে পারেন।

// আমি চাইলে তোমার জন্য প্রোডাক্ট + ক্যাটেগরি জন্য সম্পূর্ণ SEO ready Next.js example প্রজেক্ট structure বানিয়ে দিতে পারি।

// চাও কি আমি সেটা বানাই?

// You said:
// daw
// ChatGPT said:

// ঠিক আছে! আমি তোমার জন্য Next.js প্রোডাক্ট + ক্যাটেগরি SEO-ready structure তৈরি করছি। এতে থাকবে:

// ডাইনামিক প্রোডাক্ট পেজ [slug].tsx

// ডাইনামিক ক্যাটেগরি পেজ [slug].tsx

// SEO meta, Open Graph, Twitter Card

// JSON-LD structured data (product)

// Sitemap & robots.txt integration

// 1️⃣ Folder Structure (Relevant)
// /pages
//  ├─ /product/[slug].tsx
//  ├─ /category/[slug].tsx
//  ├─ _app.tsx
//  /components
//  ├─ SEO.tsx
//  /lib
//  ├─ api.ts
// next-sitemap.config.js

// 2️⃣ /components/SEO.tsx
// import Head from "next/head";

// type SEOProps = {
//   title: string;
//   description: string;
//   url: string;
//   image?: string;
// };

// export default function SEO({ title, description, url, image }: SEOProps) {
//   return (
//     <Head>
//       <title>{title}</title>
//       <meta name="description" content={description} />
//       <link rel="canonical" href={url} />

//       {/* Open Graph */}
//       <meta property="og:type" content="website" />
//       <meta property="og:url" content={url} />
//       <meta property="og:title" content={title} />
//       <meta property="og:description" content={description} />
//       {image && <meta property="og:image" content={image} />}

//       {/* Twitter Card */}
//       <meta name="twitter:card" content="summary_large_image" />
//       <meta name="twitter:title" content={title} />
//       <meta name="twitter:description" content={description} />
//       {image && <meta name="twitter:image" content={image} />}
//     </Head>
//   );
// }

// 3️⃣ /pages/product/[slug].tsx
// import { useRouter } from "next/router";
// import SEO from "../../components/SEO";

// const demoProducts = [
//   { slug: "product-1", name: "Product 1", description: "Awesome product 1", image: "/images/p1.jpg" },
//   { slug: "product-2", name: "Product 2", description: "Awesome product 2", image: "/images/p2.jpg" },
// ];

// export default function ProductPage() {
//   const router = useRouter();
//   const { slug } = router.query;

//   const product = demoProducts.find((p) => p.slug === slug) || demoProducts[0];

//   return (
//     <>
//       <SEO
//         title={product.name + " | My Store"}
//         description={product.description}
//         url={`https://yourdomain.com/product/${product.slug}`}
//         image={product.image}
//       />
//       <main className="p-6">
//         <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
//         <img src={product.image} alt={product.name} className="mb-4" />
//         <p>{product.description}</p>

//         {/* JSON-LD structured data */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org/",
//               "@type": "Product",
//               name: product.name,
//               image: product.image,
//               description: product.description,
//               url: `https://yourdomain.com/product/${product.slug}`,
//             }),
//           }}
//         />
//       </main>
//     </>
//   );
// }

// 4️⃣ /pages/category/[slug].tsx
// import { useRouter } from "next/router";
// import SEO from "../../components/SEO";

// const demoCategories = [
//   { slug: "electronics", name: "Electronics", description: "All electronic items" },
//   { slug: "fashion", name: "Fashion", description: "Trendy fashion items" },
// ];

// export default function CategoryPage() {
//   const router = useRouter();
//   const { slug } = router.query;

//   const category = demoCategories.find((c) => c.slug === slug) || demoCategories[0];

//   return (
//     <>
//       <SEO
//         title={category.name + " | My Store"}
//         description={category.description}
//         url={`https://yourdomain.com/category/${category.slug}`}
//       />
//       <main className="p-6">
//         <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
//         <p>{category.description}</p>
//         {/* List products for this category */}
//       </main>
//     </>
//   );
// }

// 5️⃣ next-sitemap.config.js
// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   siteUrl: 'https://yourdomain.com',
//   generateRobotsTxt: true,
//   sitemapSize: 5000,
//   changefreq: 'daily',
//   priority: 0.8,
//   exclude: ['/admin/*'],
// };


// package.json scripts

// {
//   "scripts": {
//     "postbuild": "next-sitemap"
//   }
// }


// এই structure এর মাধ্যমে:

// প্রতিটি প্রোডাক্ট ও ক্যাটেগরি page SEO-ready।

// Sitemap + robots.txt auto generate হবে।

// JSON-LD structured data included।

// যদি চাও, আমি প্রোডাক্ট + ক্যাটেগরি list + dynamic SEO + tailwind responsive design সব একসাথে কমপ্লিট Next.js example বানিয়ে দিতে পারি।

// চাও কি আমি সেটা বানাই?

// ChatGPT can