module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 30;
    return config;
  }
};
