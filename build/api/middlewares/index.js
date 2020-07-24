"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attachCurrentUser_1 = __importDefault(require("./attachCurrentUser"));
const isAuth_1 = __importDefault(require("./isAuth"));
exports.default = {
    attachCurrentUser: attachCurrentUser_1.default,
    isAuth: isAuth_1.default,
};
//# sourceMappingURL=index.js.map