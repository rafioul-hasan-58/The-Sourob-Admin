import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",      // ✅ Cloudinary
      "i.ibb.co",                // ✅ ImgBB short link
      "ibb.co",                  // ✅ Direct ImgBB domain
      "images.unsplash.com",     // Optional: Unsplash
      "cdn.pixabay.com",         // Optional: Pixabay
      "firebasestorage.googleapis.com", // Optional: Firebase Storage
      "example.com",             // Replace with your own domains as needed
    ],
  },
};

export default nextConfig;
