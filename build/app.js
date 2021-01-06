"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // We need this in order to use @Decorators
const config_1 = __importDefault(require("./config"));
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./loaders/logger"));
class Server {
    constructor() {
        this.app = express_1.default();
        /**
         * A little hack here
         * Async/Await cannot used in Class methods
         * So instead Promises are used here
         * @method Preconfig
         **/
        new Promise(resolve => {
            /**
             * Import/Export can only be used in 'top-level code'
             * So using good old require statements.
             **/
            resolve(require('./loaders').default({ expressApp: this.app }));
        }).then(() => {
            this.startServer(this.app);
        });
    }
    startServer(app) {
        app.listen(config_1.default.port, err => {
            if (err) {
                logger_1.default.error(err);
                process.exit(1);
                return;
            }
            logger_1.default.info(`
          ################################################
          🛡️  Server listening on port: ${config_1.default.port} 🛡️
          🌐 http://localhost:3000
          ################################################
        `);
        });
    }
}
new Server();
//# sourceMappingURL=app.js.map