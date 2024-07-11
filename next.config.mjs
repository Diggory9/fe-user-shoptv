/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"],
    },
    env: {
        API_URL: process.env.NEXT_PUBLIC_API,
        TOKEN_GHN: process.env.NEXT_PUBLIC_TOKEN_GHN
    }
};

export default nextConfig;
