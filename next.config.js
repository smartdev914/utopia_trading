const withPlugins = require('next-compose-plugins');
const withFonts = require('next-fonts');

const nextConfig = {
  // distDir: '../../dist/functions/next'
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(pdf)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './assets/docs/',
        },
      }],
    });
    // config.module.rules.push({
    //   test: /\.worker\.js$/,
    //   use: {
    //     loader: 'worker-loader',
    //     options: {
    //       filename: '7.worker.js',
    //     },
    //   },
    // });
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      type: 'asset/resource',
      generator: {
        filename: 'static/worker/[hash][ext][query]',
      },
    });

    // Important: return the modified config
    return config;
  },
};

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
  nextConfig,
);
