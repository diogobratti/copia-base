module.exports = {
    routes: require('./auth-routes'),
    authStrategy: require('./strategy'),
    authMiddleware: require('./middleware')
  };
  