const controllers = require("../controllers");
const { authorization, authentication } = require("../auth");

module.exports = (app) => {
  app.route("/checkout").post(authentication.bearer, controllers.auth.login);
};
