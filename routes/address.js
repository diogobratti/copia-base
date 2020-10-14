const controllers = require('../controllers');
const { authMiddleware } = require('../auth')

module.exports = app => {
  app
    .route('/city')
      .post(authMiddleware.bearer,controllers.city.add)
      .get(authMiddleware.bearer,controllers.city.list);

  app
    .route('/city/:id')
      .delete(authMiddleware.bearer,controllers.city.delete);
};
