"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = __importDefault(require("../middlewares"));
const express_graphql_1 = require("express-graphql");
const index_1 = require("./schema/index");
const index_2 = require("./resolvers/index");
const route = express_1.Router();
exports.default = (app) => {
    app.use('/graphql', route);
    route.use(middlewares_1.default.isAuth);
    route.use(middlewares_1.default.attachCurrentUser);
    route.use('/', express_graphql_1.graphqlHTTP({
        schema: index_1.graphQlSchema,
        rootValue: index_2.graphQlResolvers,
        graphiql: true,
    }));
};
//# sourceMappingURL=index.js.map