// TODO: Eslint config doesn't get detected...
module.exports = {
    env: {
        node: true,
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    rules: {
        "prettier/prettier": "error",
    },
};
