/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '103.186.20.110',
        port: '9999',
        pathname: '/storage/media-library/**',
      },
      {
        protocol: 'http',
        hostname: '103.186.20.110',
        port: '9999',
        pathname: '/storage/**',
      },

      // Unsplash Images
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
