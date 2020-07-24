import { Router, Request, Response } from 'express';
import auth from './routes/auth';
import agendash from './routes/agendash';
import graphQL from './graphql';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  graphQL(app);
  agendash(app);

  // Request to check if server running
  app.get('/ping', (_req: Request, _res: Response) => {
    _res.status(200).json({
      status: 200,
      message: 'Server Connected',
    });
  });

  return app;
};
