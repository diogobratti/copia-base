const controllers = require("../controllers");
const public_path = '/public';
module.exports = (app) => {
  app.route(public_path + "/user/signUp").post(controllers.user.signUp);
  app.route(public_path + "/error/notify").post(controllers.error.notify);
  app.route(public_path + "/address/getZip").get(controllers.address.getZip);
  app.route(public_path + "/state/listWithCities").get(controllers.state.listWithCities);
  app.route(public_path + '/product/listByCategory/:id').get(controllers.product.listByCategory)
};
