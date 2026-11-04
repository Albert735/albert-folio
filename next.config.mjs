/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: deploys on Vercel, Netlify or any static host.
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
