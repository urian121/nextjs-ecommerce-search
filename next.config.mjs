/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["api.escuelajs.co", "picsum.photos"], // Agrega dominios conocidos
    dangerouslyAllowSVG: true, // Permite imágenes en formato SVG
    contentSecurityPolicy:
      "default-src 'self'; img-src *; media-src *; script-src 'none'; sandbox;",

    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Permite cualquier dominio remoto
      },
    ],
  },
};

export default nextConfig;
