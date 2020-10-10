const controllers = require('./../controllers');
const { authMiddleware } = require('../auth')

module.exports = app => {
  app
    .route('/user')
      .post(controllers.user.add)
      .get(controllers.user.list);

  app
    .route('/user/:id')
      .delete(authMiddleware.bearer,controllers.user.delete);
};
