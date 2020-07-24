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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const event_dispatch_1 = require("event-dispatch");
const events_1 = __importDefault(require("./events"));
let UserSubscriber = class UserSubscriber {
    /**
     * A great example of an event that you want to handle
     * save the last time a user signin, your boss will be pleased.
     *
     * Altough it works in this tiny toy API, please don't do this for a production product
     * just spamming insert/update to mongo will kill it eventualy
     *
     * Use another approach like emit events to a queue (rabbitmq/aws sqs),
     * then save the latest in Redis/Memcache or something similar
     */
    onUserSignIn({ _id }) {
        const Logger = typedi_1.Container.get('logger');
        try {
            const UserModel = typedi_1.Container.get('UserModel');
            UserModel.update({ _id }, { $set: { lastLogin: new Date() } });
        }
        catch (e) {
            Logger.error(`🔥 Error on event ${events_1.default.user.signIn}: %o`, e);
            // Throw the error so the process die (check src/app.ts)
            throw e;
        }
    }
    onUserSignUp({ name, email, _id }) {
        const Logger = typedi_1.Container.get('logger');
        try {
            /**
             * @TODO implement this
             */
            // Call the tracker tool so your investor knows that there is a new signup
            // and leave you alone for another hour.
            // TrackerService.track('user.signup', { email, _id })
            // Start your email sequence or whatever
            // MailService.startSequence('user.welcome', { email, name })
        }
        catch (e) {
            Logger.error(`🔥 Error on event ${events_1.default.user.signUp}: %o`, e);
            // Throw the error so the process dies (check src/app.ts)
            throw e;
        }
    }
};
__decorate([
    event_dispatch_1.On(events_1.default.user.signIn),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserSubscriber.prototype, "onUserSignIn", null);
__decorate([
    event_dispatch_1.On(events_1.default.user.signUp),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserSubscriber.prototype, "onUserSignUp", null);
UserSubscriber = __decorate([
    event_dispatch_1.EventSubscriber()
], UserSubscriber);
exports.default = UserSubscriber;
//# sourceMappingURL=user.js.map