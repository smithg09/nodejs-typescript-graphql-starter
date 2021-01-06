"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const dependencyInjector_1 = __importDefault(require("./dependencyInjector"));
const mongoose_1 = __importDefault(require("./mongoose"));
const jobs_1 = __importDefault(require("./jobs"));
const logger_1 = __importDefault(require("./logger"));
//We have to import at least all the events once so they can be triggered
require("./events");
exports.default = async ({ expressApp }) => {
    const mongoConnection = await mongoose_1.default();
    logger_1.default.info('✌️ DB loaded and connected!');
    /**
     * WTF is going on here?
     *
     * We are injecting the mongoose models into the DI container.
     * I know this is controversial but will provide a lot of flexibility at the time
     * of writing unit tests, just go and check how beautiful they are!
     */
    const userModel = {
        name: 'userModel',
        // Notice the require syntax and the '.default'
        model: require('../models/user').default,
    };
    // It returns the agenda instance because it's needed in the subsequent loaders
    const { agenda } = await dependencyInjector_1.default({
        mongoConnection,
        models: [
            userModel,
        ],
    });
    logger_1.default.info('✌️ Dependency Injector loaded');
    await jobs_1.default({ agenda });
    logger_1.default.info('✌️ Jobs loaded');
    await express_1.default({ app: expressApp });
    logger_1.default.info('✌️ Express loaded');
};
//# sourceMappingURL=index.js.map