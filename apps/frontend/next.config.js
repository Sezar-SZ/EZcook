/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["backend"],
    images: {
        remotePatterns: [
            {
                protocol:
                    process.env.NODE_ENV === "development" ? "http" : "https",
                hostname: process.env.HOSTNAME,
            },
        ],
    },
};

module.exports = {
    ...nextConfig,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
};
