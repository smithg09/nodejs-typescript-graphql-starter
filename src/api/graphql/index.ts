/* eslint-disable prettier/prettier */
import { Router } from 'express';
// import { Container } from 'typedi';
// import { Logger } from 'winston';
import middlewares from '../middlewares';
import { graphqlHTTP } from 'express-graphql';
import { graphQlSchema }  from './schema/index';
import { graphQlResolvers } from './resolvers/index';

const route = Router();

export default (app: Router) => {
  app.use('/graphql', route);

  route.use(middlewares.isAuth);
  route.use(middlewares.attachCurrentUser);
  route.use(
    '/',
    graphqlHTTP({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true,
    }),
  );
};
