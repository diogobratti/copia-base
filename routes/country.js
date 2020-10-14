const controllers = require('./../controllers');
const { authMiddleware } = require('../auth')

module.exports = app => {
  app
    .route('/country')
      .post(authMiddleware.bearer,controllers.country.add)
      .get(authMiddleware.bearer,controllers.country.list);

  app
    .route('/country/:id')
      .delete(authMiddleware.bearer,controllers.country.delete);
};
