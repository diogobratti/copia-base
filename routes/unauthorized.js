const controllers = require('../controllers');

module.exports = app => {
    app
        .route('/user/signUp')
        .post(controllers.user.signUp);
    app
        .route('/address/getZip')
        .get(controllers.address.getZip);
    app
        .route('/state/listWithCities')
        .get(controllers.state.listWithCities);

};
