import { buildSchema } from 'graphql';

export const graphQlSchema = buildSchema(`
        scalar Date

        type User {
            _id: ID!
            name: String
            email: String!
            password: String!
            salt: String!
            role: String!
            lastLogin: Date
            createdAt: Date
            updatedAt: Date
        }

        type RootQuery {
          users: [User]
        }

        schema {
            query: RootQuery
        }
  `);
