const controllers = require("../controllers");
const { authorization, middleware } = require("../auth");

module.exports = (app) => {
  app.route("/checkout").post(middleware.bearer, controllers.auth.login);
};
