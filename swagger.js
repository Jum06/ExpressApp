import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Stockmanager API',
        description: 'API for managing stock',
    },
    host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({openapi: "3.1.0"})(outputFile, routes, doc);