"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const emailSequence_1 = __importDefault(require("../jobs/emailSequence"));
exports.default = ({ agenda }) => {
    agenda.define('send-email', { priority: 'high', concurrency: config_1.default.agenda.concurrency }, 
    // @TODO Could this be a static method? Would it be better?
    new emailSequence_1.default().handler);
    agenda.start();
};
//# sourceMappingURL=jobs.js.map