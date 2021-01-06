"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.graphQlSchema = graphql_1.buildSchema(`
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
//# sourceMappingURL=index.js.map