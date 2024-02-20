/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["handlebars"],
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
