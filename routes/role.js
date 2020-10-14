const controllers = require('../controllers');
const { authMiddleware } = require('../auth')

module.exports = app => {
  app
    .route('/role')
      .post(authMiddleware.bearer,controllers.role.add)
      .get(authMiddleware.bearer,controllers.role.list);

  app
    .route('/role/:id')
      .delete(authMiddleware.bearer,controllers.role.delete);
};
