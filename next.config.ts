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
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/profile_users/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
