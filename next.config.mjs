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
      {
        protocol: 'http',
        hostname: '103.186.20.110',
        port: '9999',
        pathname: '/avatar/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },

      // Amazon S3
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
