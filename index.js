require('dotenv').config();
const mongoose = require('mongoose');
const { ApolloServer } = require('@apollo/server');  // Change import
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const verifyToken = require('./utils/verify_token');

const MONGODB = process.env.MONGODB_URL;
const app = express();


const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
        
});


const startServer = async () => {
    try {
        await server.start();

        app.use(
            cors(),
            bodyParser.json(),
            expressMiddleware(server, {
                context: verifyToken,
            }),

        );

        await mongoose.connect(MONGODB, { useNewUrlParser: true });
        console.log('MongoDB Connected');
        await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
        console.log(`🚀 Server ready at http://localhost:4000`);
    } catch (error) {
        console.error('Error starting the server:', error);
    }
};

startServer();
