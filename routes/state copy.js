const controllers = require('../controllers');
const { authMiddleware } = require('../auth')

module.exports = app => {
  app
    .route('/state')
      .post(authMiddleware.bearer,controllers.state.add)
      .get(authMiddleware.bearer,controllers.state.list);

  app
    .route('/state/:id')
      .delete(authMiddleware.bearer,controllers.state.delete);
};
