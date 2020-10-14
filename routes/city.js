const controllers = require('../controllers');
const { authMiddleware } = require('../auth')

module.exports = app => {
  app
    .route('/address')
      .post(authMiddleware.bearer,controllers.address.add)
      .get(authMiddleware.bearer,controllers.address.list);

  app
    .route('/address/:id')
      .delete(authMiddleware.bearer,controllers.address.delete);
};
