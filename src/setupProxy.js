const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/artists-api-controller',
    createProxyMiddleware({
      target: 'https://europe-west1-madesimplegroup-151616.cloudfunctions.net',
      changeOrigin: true,
    })
  );
};
