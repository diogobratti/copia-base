const postsControlador = require('./posts-controlador');
const { authMiddleware } = require('../auth');

module.exports = app => {
  app
    .route('/post')
    .get(postsControlador.lista)
    .post(authMiddleware.bearer,
        postsControlador.adiciona);
};
