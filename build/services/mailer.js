"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const typedi_2 = require("typedi");
let MailerService = class MailerService {
    constructor(emailClient) {
        this.emailClient = emailClient;
        this.Logger = typedi_1.Container.get('logger');
    }
    async SendWelcomeEmail(email) {
        /**
         * @TODO Call Mailchimp/Sendgrid or whatever
         */
        // Added example for sending mail from mailgun
        this.Logger.debug(`🔥Sending Welcome mail to %o`, email);
        const data = {
            from: 'Excited User <me@samples.mailgun.org>',
            to: email,
            subject: 'Hello',
            text: 'Testing some Mailgun awesomness!',
        };
        this.emailClient.messages().send(data);
        return { delivered: 1, status: 'ok' };
    }
    StartEmailSequence(sequence, user) {
        if (!user.email) {
            throw new Error('No email provided');
        }
        // @TODO Add example of an email sequence implementation
        // Something like
        // 1 - Send first email of the sequence
        // 2 - Save the step of the sequence in database
        // 3 - Schedule job for second email in 1-3 days or whatever
        // Every sequence can have its own behavior so maybe
        // the pattern Chain of Responsibility can help here.
        return { delivered: 1, status: 'ok' };
    }
};
MailerService = __decorate([
    typedi_2.Service(),
    __param(0, typedi_2.Inject('emailClient')),
    __metadata("design:paramtypes", [Object])
], MailerService);
exports.default = MailerService;
//# sourceMappingURL=mailer.js.map