"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
    const logger = typedi_1.Container.get('logger');
    try {
        const UserModel = typedi_1.Container.get('userModel');
        const userRecord = await UserModel.findById(req.token._id);
        if (req.baseUrl.split('/').includes('graphql')) {
            req.isAuth = false;
            return next();
        }
        if (!userRecord) {
            req.isAuth = false;
            return res.sendStatus(401);
        }
        const currentUser = userRecord.toObject();
        Reflect.deleteProperty(currentUser, 'password');
        Reflect.deleteProperty(currentUser, 'salt');
        req.isAuth = true;
        req.currentUser = currentUser;
        return next();
    }
    catch (e) {
        logger.error('🔥 Error attaching user to req: %o', e);
        return next(e);
    }
};
exports.default = attachCurrentUser;
//# sourceMappingURL=attachCurrentUser.js.map