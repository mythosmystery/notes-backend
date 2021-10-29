"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const UserResolvers_1 = require("./schema/resolvers/UserResolvers");
const main = async () => {
    await (0, typeorm_1.createConnection)();
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [UserResolvers_1.RegisterResolver],
    });
    const apolloServer = new apollo_server_express_1.ApolloServer({ schema });
    const app = (0, express_1.default)();
    apolloServer.applyMiddleware({ app });
    app.listen(3001, () => {
        console.log('server started on http://localhost:3001/graphql');
    });
};
main();
//# sourceMappingURL=index.js.map