const withYaml = require('next-plugin-yaml');
require('dotenv');

module.exports = withYaml({
  env: {
    FIREBASEAPIKEY: process.env.FIREBASEAPIKEY,
    FIREBASEAUTHDOMAIN: process.env.FIREBASEAUTHDOMAIN,
    FIREBASEPROJECTID: process.env.FIREBASEPROJECTID,
    FIREBASESTORAGEBUCKET: process.env.FIREBASESTORAGEBUCKET,
    FIREBASEMESSAGINGSENDERID: process.env.FIREBASEMESSAGINGSENDERID,
    FIREBASEAPPID: process.env.FIREBASEAPPID,
    FIREBASEMEASUREMENTID: process.env.FIREBASEMEASUREMENTID,
  },
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
