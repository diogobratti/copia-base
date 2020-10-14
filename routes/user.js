const controllers = require('./../controllers');
const { authMiddleware } = require('../auth')

module.exports = app => {
  app
    .route('/user')
      .post(authMiddleware.bearer,controllers.user.add)
      .get(authMiddleware.bearer,controllers.user.list);

  app
    .route('/user/:id')
      .delete(authMiddleware.bearer,controllers.user.delete);
};
