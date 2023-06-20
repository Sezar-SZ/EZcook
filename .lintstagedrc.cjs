module.exports = {
    "**/*.{ts,tsx}": [() => "pnpm type-check", "pnpm lint:fix "],
};
