const webpack = require('webpack');
const prefix = 'FIREBASE_MAPS_';

const keys = Object.keys(process.env).filter(key => key.startsWith(prefix));

const env = keys.reduce((result, current) => {
  result[current] = JSON.stringify(process.env[current]);
  return result;
}, {});

module.exports = config => {
  config.plugins.push(
    new webpack.DefinePlugin({
      ENV_VARS: env
    })
  );

  return config;
};
