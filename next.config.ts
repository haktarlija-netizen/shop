const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },

 
  images: {

     domains: ["localhost:3000", "my-shopings.com"], // এখানে img link যেই ডোমেইন থেকে আসবে সেটা লিখতে হবে
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" }, // needed for your product images
    ],
  },
};

module.exports = withPWA(nextConfig);
