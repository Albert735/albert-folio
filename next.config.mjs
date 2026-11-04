/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: deploys on Vercel, Netlify or any static host.
  output: "export",
  // each page exports as folder/index.html, so /blog/post works on any static host
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
