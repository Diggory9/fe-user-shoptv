/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"],
    },
    env: {
        API_URL: process.env.NEXT_PUBLIC_API_URL,
        TOKEN_GHN: process.env.NEXT_PUBLIC_TOKEN_GHN,
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
