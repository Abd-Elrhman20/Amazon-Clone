/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: "i.ibb.co"
            }
        ]
    },
}

module.exports = nextConfig
