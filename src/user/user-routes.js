const userController = require('./user-controller');
const { authMiddleware } = require('../auth')

module.exports = app => {
  app
    .route('/user')
    .post(userController.add)
    .get(userController.list);

  app.route('/user/:id').delete(authMiddleware.bearer,
                              userController.delete);
};
