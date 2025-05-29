/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    unoptimized: true, // Disable Next.js optimization
  },
   async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true, // 308 redirect
      },
    ];
  },
};

export default nextConfig;
