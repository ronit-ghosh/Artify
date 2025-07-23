/** @type {import('next').NextConfig} */
import { config } from "dotenv";

config({ path: "../../.env", quiet: true });
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: "pub-66db4db1df6146b2a0d8cbe8012f60fe.r2.dev",
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: "v3.fal.media",
        pathname: '**',
      },
    ],
  }
};

export default nextConfig;
