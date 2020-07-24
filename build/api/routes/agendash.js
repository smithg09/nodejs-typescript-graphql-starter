"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const agendash_1 = __importDefault(require("agendash"));
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../config"));
exports.default = (app) => {
    const agendaInstance = typedi_1.Container.get('agendaInstance');
    app.use('/dash', express_basic_auth_1.default({
        users: {
            [config_1.default.agendash.user]: config_1.default.agendash.password,
        },
        challenge: true,
    }), agendash_1.default(agendaInstance));
};
//# sourceMappingURL=agendash.js.map