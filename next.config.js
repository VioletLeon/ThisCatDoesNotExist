const withYaml = require('next-plugin-yaml');

module.exports = withYaml({
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
          plugins: ['@babel/plugin-syntax-jsx'],
        },
      },
    });

    return config;
  },
});
