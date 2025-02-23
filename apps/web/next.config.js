/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
        CLOUDFLARE_URL: process.env.CLOUDFLARE_URL,
      },
      images:{
        domains: ['res.cloudinary.com', 'images.unsplash.com'],
      }
};

export default nextConfig;
