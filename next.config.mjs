/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["handlebars"],
    serverActions: {
      bodySizeLimit: "2mb",
    },
    // serverActions: {
    //   bodySizeLimit: "2mb", // Set desired value here
    // },
  },
};

export default nextConfig;
