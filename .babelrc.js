module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                // 禁止babel把 ES6 模块转为 CommonJS 模块，让 webpack 处理，以便使用tree-shaking
                modules: false,
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true,
            },
        ],
    ],
};
