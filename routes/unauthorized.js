const controllers = require('../controllers');
const middlewares = require('./../auth/middleware');

module.exports = app => {
    app
        .route('/user/signUp')
        .post(controllers.user.signUp);
};
