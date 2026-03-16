import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Remove trailing slashes from URLs
  trailingSlash: false,
};

initOpenNextCloudflareForDev();

export default nextConfig;
