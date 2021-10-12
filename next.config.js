const withPlugins = require('next-compose-plugins')
const withFonts = require('next-fonts')
const path = require('path')

const nextConfig = {
    // distDir: '../../dist/functions/next'
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(pdf)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './assets/docs/',
                    },
                },
            ],
        })
        config.module.rules.unshift({
            test: /pdf\.worker\.(min\.)?js/,
            type: 'asset/resource',
            generator: {
                filename: 'static/worker/[hash][ext][query]',
            },
        })

        // eslint-disable-next-line no-param-reassign
        config.resolve.alias = {
            ...config.resolve.alias,
            ABI: path.resolve(__dirname, 'src/ABI'),
        }

        // Important: return the modified config
        return config
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}

module.exports = withPlugins(
    [
        [
            {
                mozjpeg: {
                    quality: 90,
                },
                webp: {
                    preset: 'default',
                    quality: 90,
                },
            },
        ],
        withFonts,
    ],
    nextConfig
)
