import 'reflect-metadata'; // We need this in order to use @Decorators
import config from './config';
import express from 'express';
import Logger from './loaders/logger';

class Server {
  private app: express.Application;
  constructor() {
    this.app = express();
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

  private startServer(app: express.Application) {
    app.listen(config.port, err => {
      if (err) {
        Logger.error(err);
        process.exit(1);
        return;
      }
      Logger.info(`
          ################################################
          🛡️  Server listening on port: ${config.port} 🛡️
          🌐 http://localhost:3000
          ################################################
        `);
    });
  }
}
new Server();
