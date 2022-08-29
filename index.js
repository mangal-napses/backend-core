require('app-module-path').addPath(__dirname);

const express = require('express');

const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: `./env/.env.${process.env.NODE_ENV}` });
const cls = require('cls-hooked');
const config = require('config/config');
const bodyParser = require('body-parser');
const { utilities: { ApiError, logInfo, logError }, HTTP_CONSTANT } = require('@napses/namma-lib');
const app = express();
const server = require('http').createServer(app);
const Route = require('route');
const uuid = require('uuid');

Route.setApp(app);

const allowedOrigins = config.cors.whiteListOrigins;
const allowedOriginsRegularExpression = allowedOrigins.map((origin) => new RegExp(origin + "$"));
app.use(cors({ origin: allowedOriginsRegularExpression }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const namespace = cls.getNamespace(config.clsNameSpace);
    const platform = req.headers['x-platform'] || 'unknown-platform';
    namespace.run(() => {
        namespace.set('traceId', uuid.v4());
        logInfo(`${req.method} ${req.originalUrl}`, { ...req.body, platform });
        next();
    });
});

//HealthCheck endpoints
const healthCheckApi = require('resources/health-check-api');
const healthCheckDbAPi = require('resources/health-check-db-api');

app.get('/health-check-api', healthCheckApi);
app.get('/health-check-db', healthCheckDbAPi);

require('./api-routes');

app.use((req, res, next) => {
    const err = new ApiError('Not Found', 'Resource Not Found!', HTTP_CONSTANT.NOT_FOUND);
    next(err);
});

app.use((error, request, response, next) => {
    const platform = request.headers['x-platform'] || 'unknown-platform';

    if (error.constructor === ApiError) {
        logError('Failed to execute the operation', {
            error: {
                value: error.error, stack: error.error ? error.error.stack : []
            },
            platform
        });
        if (error.code) { response.status(error.code); }

        response.send({
            status: false,
            errorType: 'api',
            message: error.errorMessage
        });
    } else {
        console.error(error);
        response.status(501);
        logError('Failed to execute the operation', { value: error, stack: error.stack, platform });
        response.send({
            status: false,
            errorType: 'unhandled',
            message: 'Something went wrong!'
        });
    }
});

process.on('unhandledRejection', (error) => {
    console.log(error);
    logError('unhandledRejection', { error });
});

process.on('uncaughtException', (error) => {
    console.log(error);
    logError('uncaughtException', { error });
});

process.on('SIGTERM', () => {
    logInfo('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        logInfo('HTTP server closed');
    })
})

server.listen(config.apiPort, () => {
    console.log(`Express server listening on Port :- ${config.apiPort}`);
});
