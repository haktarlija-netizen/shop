
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Anitsniajt from './animates/Ants';
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




// export const metadata: Metadata = {
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




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

<head>

   <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#020e29ff" />
        <link rel="apple-touch-icon" href="192 favicon.png" />

</head>


      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

            {children}
<Anitsniajt />

    

  <Toaster position="top-right" reverseOrder={false} />

      </body>
    </html>
  );
}
