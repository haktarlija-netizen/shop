



import React from 'react'

export default function page() {
  return (
    <div>
  PRoduct view page    
    </div>
  )
}



// import { Metadata } from 'next'

//  import ProductClient from '../ProductViews'
// type Props = {
//   params: { id: string }
// }

// export async function generateMetadata(
//   { params }: Props
// ): Promise<Metadata> {

//   const productId = params.id

//   return {
//     title: `Product ${productId} | My-shopings.com`,
//     description:
//       'আমাদের ইকমার্সে পাবেন সেরা মানের পণ্য সাশ্রয়ী দামে।',
//     keywords: [
//       'Ecommerce Bangladesh',
//       'Online Shop BD',
//       'Buy Product Online',
//     ],

//     alternates: {
//       canonical: `https://www.my-shopings.com/product/${productId}`,
//     },

//     openGraph: {
//       type: 'product',
//       title: `Product ${productId}`,
//       description: 'Best product in Bangladesh',
//       url: `https://www.my-shopings.com/product/${productId}`,
//       images: [
//         {
//           url: 'https://www.myshop.com/og-image.jpg',
//           width: 1200,
//           height: 630,
//           alt: 'Product Image',
//         },
//       ],
//       locale: 'bn_BD',
//     },
//   }
// }

// export default function Page({ params }: Props) {
//   return <ProductClient productId={Number(params.id)} />
// }


// 'use client'
// import React from 'react'
// import ProductViews from '../ProductViews'




// import { useParams } from 'next/navigation';





// export default function page() {
  
//     const params = useParams();
  
//       const cleanId = params.id;
//         const productId = Number(cleanId);








//  const metadata: Metadata = {
//   title: "My-shopings.com – Best Online Store in Bangladesh",
//   description: "আমাদের ইকমার্সে পাবেন সেরা মানের পণ্য সাশ্রয়ী দামে। Fast Delivery, Secure Payment এবং ২৪/৭ কাস্টমার সার্পোট।",
//   keywords: ["Ecommerce", "Online Shop", "Bangladesh", "Buy Products", "Best Price"],
//   openGraph: {
//     title: "My Shop – Best Online Store in Bangladesh",
//     description: "আমাদের ইকমার্সে পাবেন সেরা মানের পণ্য সাশ্রয়ী দামে।",
//     url: "https://www.my-shopings.com",
//     siteName: "my-shopings.com/home page",
//     images: [
//       {
//         url: "https://www.myshop.com/og-image.jpg",
//         width: 1200,
//         height: 630,
//         alt: "My Shop Banner",
//       },
//     ],
//     locale: "BD",
//     type: "website",
//   },
//   alternates: {
//     canonical: "https://www.my-shopings.com",
//   },
// };




//   return (
//     <>
    

    
    
//     <ProductViews   productIdget={productId}  />
    
    
    
    
//     </>
//   )
// }
