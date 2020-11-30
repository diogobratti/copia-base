const i18n = require("../i18n/texts");
const database = require("./../models");
const ROLES = {
  GLOBAL_ADMIN: 1,
  GROUP_ADMIN: 2,
  LOCAL_ADMIN: 3,
  CLIENT: 4,
};

module.exports = {
  isGlobalAdmin: (req, res, next) => {
    if (req.user.dataValues.RoleId === ROLES.GLOBAL_ADMIN) {
      next();
      return;
    } else {
      res.status(403).send({
        message: i18n.UNAUTHORIZED_ACTION,
      });
    }
  },
  isGroupAdmin: (req, res, next) => {
    if (req.user.dataValues.RoleId === ROLES.GROUP_ADMIN) {
      next();
      return;
    } else {
      res.status(403).send({
        message: i18n.UNAUTHORIZED_ACTION,
      });
    }
  },
  isLocalAdmin: (req, res, next) => {
    if (req.user.dataValues.RoleId === ROLES.LOCAL_ADMIN) {
      next();
      return;
    } else {
      res.status(403).send({
        message: i18n.UNAUTHORIZED_ACTION,
      });
    }
  },
  isClient: (req, res, next) => {
    if (req.user.dataValues.RoleId === ROLES.CLIENT) {
      next();
      return;
    } else {
      res.status(403).send({
        message: i18n.UNAUTHORIZED_ACTION,
      });
    }
  },
  isMyUser: (req, res, next) => {
    if (req.user.dataValues.id === req.param.id) {
      next();
      return;
    } else {
      res.status(403).send({
        message: i18n.UNAUTHORIZED_ACTION,
      });
    }
  },
  isMyAddress: async (req, res, next) => {
    const addresses = await database.Address.findAll({
      where: { userId: req.user.dataValues.id },
    });
    if (addresses === null) {
      res.status(403).send({
        message: i18n.UNAUTHORIZED_ACTION,
      });
    }
    const addressFound = addresses.find((element) => {
      return element.id === req.param.id;
    });
    if (addressFound) {
      next();
      return;
    } else {
      res.status(403).send({
        message: i18n.UNAUTHORIZED_ACTION,
      });
    }
  },
};
