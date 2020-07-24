"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const mailer_1 = __importDefault(require("../services/mailer"));
class EmailSequenceJob {
    async handler(job, done) {
        const logger = typedi_1.Container.get('logger');
        try {
            logger.debug('✌️ Email Sequence Job triggered!');
            const { email, name } = job.attrs.data;
            const mailerServiceInstance = typedi_1.Container.get(mailer_1.default);
            await mailerServiceInstance.SendWelcomeEmail(email);
            done();
        }
        catch (e) {
            logger.error('🔥 Error with Email Sequence Job: %o', e);
            done(e);
        }
    }
}
exports.default = EmailSequenceJob;
//# sourceMappingURL=emailSequence.js.map