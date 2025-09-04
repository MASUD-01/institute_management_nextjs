/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this section to enable Turbopack
  experimental: {
    // This will make `next dev` use Turbopack
    // Note: Turbopack is currently experimental
    // so features may be missing or change.
    appDir: true,
    serverActions: true,
    turbopack: true,
  },
};

module.exports = nextConfig;
