/** @type {import("next").NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "images.unsplash.com" },
            {
                protocol: "https",
                hostname: "cdn.loveandlemons.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
            },
            { protocol: "https", hostname: "media-exp1.licdn.com" },
        ],
    },
    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig;
