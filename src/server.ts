import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import { logger } from './config/logger';
import expressPinoLogger from 'express-pino-logger';
import studentRoutes from './routes/students';
import config from './config';

const application = express();

application.use(expressPinoLogger({ logger: logger }));
application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());
application.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (request.method === 'OPTIONS') {
        response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return response.status(200).json({});
    }
    next();
});

application.use('/students', studentRoutes);

application.use((request, response, next) => {
    const error = new Error('Not Found');
    response.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(application);

httpServer.listen(config.server.port, () => logger.info('Server', `Server is running in ${config.server.host}:${config.server.port}`));
