const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    webpack: {
        configure: (webpackConfig, {env, paths}) => {
            // Filter out the original HtmlWebpackPlugin
            const plugins = webpackConfig.plugins.filter(plugin => !(plugin instanceof HtmlWebpackPlugin));

            return {
                ...webpackConfig,
                entry: {
                    main: [
                        env === 'development' && require.resolve('react-dev-utils/webpackHotDevClient'),
                        paths.appIndexJs
                    ].filter(Boolean),
                    note: [
                        env === 'development' && require.resolve('react-dev-utils/webpackHotDevClient'),
                        paths.appSrc + "/note.tsx"
                    ].filter(Boolean),
                    background: './src/chrome/background.ts'
                },
                output: {
                    ...webpackConfig.output,
                    path: paths.appBuild,
                    pathinfo: true,
                    filename: chunkData => {
                        return chunkData.chunk.name === 'background' ? 'static/js/[name].js' : 'static/js/[name].bundle.js';
                    },
                    chunkFilename: 'static/js/[name].chunk.js',
                    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath),
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,
                },
                plugins: [
                    ...plugins,
                    new HtmlWebpackPlugin({
                        inject: true,
                        chunks: ["main"],
                        template: paths.appHtml,
                    }),
                    new HtmlWebpackPlugin({
                        inject: true,
                        chunks: ["note"],
                        template: paths.appHtml,
                        filename: 'note.html',
                    }),
                ]
            }
        },
    }
}
