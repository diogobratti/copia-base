const i18n = require('../i18n/texts');
const database = require('./../models');

module.exports = {
    isGlobalAdmin: (req, res, next) => {
        if(req.user.dataValues.RoleId === 1){
            next();
            return;
        } else {
            res.status(403).send({
                message: i18n.UNAUTHORIZED_ACTION
            });
        }
    },
    isGroupAdmin: (req, res, next) => {
        if(req.user.dataValues.RoleId === 2){
            next();
            return;
        } else {
            res.status(403).send({
                message: i18n.UNAUTHORIZED_ACTION
            });
        }
    },
    isLocalAdmin: (req, res, next) => {
        if(req.user.dataValues.RoleId === 3){
            next();
            return;
        } else {
            res.status(403).send({
                message: i18n.UNAUTHORIZED_ACTION
            });
        }
    },
    isClient: (req, res, next) => {
        if(req.user.dataValues.RoleId === 4){
            next();
            return;
        } else {
            res.status(403).send({
                message: i18n.UNAUTHORIZED_ACTION
            });
        }
    },
    isMyUser: (req, res, next) => {
        if(req.user.dataValues.id === req.param.id){
            next();
            return;
        } else {
            res.status(403).send({
                message: i18n.UNAUTHORIZED_ACTION
            });
        }
    },
    isMyAddress: async (req, res, next) => {
        const addresses = await database.Address.findAll({ where: { userId: req.user.dataValues.id } })
        if(addresses === null) {
            res.status(403).send({
                message: i18n.UNAUTHORIZED_ACTION
            });
        }
        addresses.forEach(element => {
            if(element.id === req.param.id){
                next();
                return;
            }
        });
        res.status(403).send({
            message: i18n.UNAUTHORIZED_ACTION
        });
    },
}