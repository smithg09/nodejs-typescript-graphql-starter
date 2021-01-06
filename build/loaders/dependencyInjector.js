"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const logger_1 = __importDefault(require("./logger"));
const agenda_1 = __importDefault(require("./agenda"));
const config_1 = __importDefault(require("../config"));
const mailgun_js_1 = __importDefault(require("mailgun-js"));
exports.default = ({ mongoConnection, models }) => {
    try {
        models.forEach(m => {
            typedi_1.Container.set(m.name, m.model);
        });
        const agendaInstance = agenda_1.default({ mongoConnection });
        typedi_1.Container.set('agendaInstance', agendaInstance);
        typedi_1.Container.set('logger', logger_1.default);
        typedi_1.Container.set('emailClient', mailgun_js_1.default({ apiKey: config_1.default.emails.apiKey, domain: config_1.default.emails.domain }));
        logger_1.default.info('✌️ Agenda injected into container');
        return { agenda: agendaInstance };
    }
    catch (e) {
        logger_1.default.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};
//# sourceMappingURL=dependencyInjector.js.map