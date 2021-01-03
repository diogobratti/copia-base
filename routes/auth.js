const controllers = require("../controllers");
const authentication = require("./../auth/authentication");

module.exports = (app) => {
  app.route("/auth/login").post(authentication.local, controllers.auth.login);
  app.route("/auth/logout").get(authentication.bearer, controllers.auth.logout);
  app.route("/auth/passwordChange").post(controllers.auth.passwordChange);

  app.route("/auth/forgotMyPassword").post(controllers.auth.forgotMyPassword);

  app
    .route("/auth/refreshToken")
    .post(authentication.refresh, controllers.auth.login);

  app
    .route("/auth/verifyEmail/:token")
    .get(authentication.emailVerification, controllers.auth.emailVerification);
};
