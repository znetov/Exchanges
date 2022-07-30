const aliases = {
    components: '/src/components',
    services: '/src/services',
    types: '/src/types',
    styles: '/src/styles',
    assets: '/src/assets'
};

const createWebpackAliases = (basePath) =>
    Object.entries(aliases).reduce(
        (accumulator, [name, path]) => ({
            ...accumulator,
            [name]: `${basePath}${path}`,
        }),
        {}
    );

module.exports = {
    webpackAlias: createWebpackAliases(__dirname),
};
