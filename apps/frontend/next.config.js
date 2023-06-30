/** @type {import('next').NextConfig} */
const nextConfig = { transpilePackages: ["backend"] };

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
