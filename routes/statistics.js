const controllers = require("../controllers");
const { authorization, authentication } = require("../auth");

module.exports = (app) => {
  app
    .route("/statistics/salesByProvider")
    .get(
      [
        authentication.bearer,
        // authorization.isGlobalAdmin,
        // authorization.isGroupAdmin,
        // authorization.isLocalAdmin,
      ],
      controllers.auth.logout
    );
};
