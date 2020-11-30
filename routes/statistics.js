const controllers = require("../controllers");
const { authorization, middleware } = require("../auth");

module.exports = (app) => {
  app
    .route("/statistics/salesByProvider")
    .get(
      [
        middleware.bearer,
        authorization.isGlobalAdmin,
        authorization.isGroupAdmin,
        authorization.isLocalAdmin,
      ],
      controllers.auth.logout
    );
};
