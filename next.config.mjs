/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.google.com", "api.escuelajs.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
