/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    CLOUDFLARE_URL: process.env.CLOUDFLARE_URL,
  },
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
    ],
  }
};

export default nextConfig;
