"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
exports.graphQlResolvers = {
    users: async () => {
        const UserModel = typedi_1.Container.get('userModel');
        const users = await UserModel.find({});
        return users;
    },
};
//# sourceMappingURL=index.js.map