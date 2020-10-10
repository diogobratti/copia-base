const controllers = require('../controllers');
const middlewares = require('./../auth/middleware')

module.exports = app => {
  app
    .route('/auth/login')
    .post(
      middlewares.local,
      controllers.user.login
    );
  app
    .route('/auth/logout')
    .get(
      middlewares.bearer,
      controllers.user.logout
    );
};
