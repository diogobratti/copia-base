const userController = require('../user/user-controller');
const middleware = require('./middleware')

module.exports = app => {
  app
    .route('/auth/login')
    .post(
        middleware.local,
        userController.login
    );
  app
    .route('/auth/logout')
    .get(
        middleware.bearer,
        userController.logout
    );
};
