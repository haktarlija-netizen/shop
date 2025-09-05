// app/Login/[id]/page.tsx

import React from 'react'

import type { Metadata } from "next";

import Homeps from './Home'

export const metadata: Metadata = {
  title: "লগইন করুন ও রেফার করে আয় করুন | MyApp",
  description:
    "লগইন করুন এবং আপনার বন্ধুদের রেফার করুন। প্রতি সফল রেফারে আপনি পাবেন ৫/১০/২০ টাকা। এখনই রেফার লিংক শেয়ার করুন ও আয় শুরু করুন।",
  keywords: ["রেফার এন্ড আর্ন", "লগইন", "বাংলা আয়", "অনলাইন ইনকাম", "রেফার লিংক"],
  openGraph: {
    title: "রেফার করলেই আয় | MyApp",
    description:
      "লগইন করুন, রেফার করুন আর প্রতি রেফারে ৫/১০/২০ টাকা পান। বেশি বেশি রেফার করুন, বেশি আয় করুন।",
    url: "https://yourdomain.com/login",
    siteName: "MyApp",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "রেফার এন্ড আর্ন",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
};

export default function page() {
  return (
 <>

 <Homeps />
 </>
  )
}
