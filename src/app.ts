import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import morgan from 'morgan';

import { logFailed } from './loaders/logger';
import { logSuccess } from './loaders/logger';
import { Routes } from './api/routes';
import mongoose from './loaders/db';
import config from './config';

async function startServer() {
    const app = express();

    mongoose.on('error', console.error.bind(console, 'MongoDB connection error:'));

    app.use(morgan(config.logs.level));
    app.use(cors());
    app.use(passport.initialize());
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(config.api.prefix, new Routes().router);

    app.listen(config.port, () => {
        logSuccess(`🛡️  Server listening on port: ${config.port} 🛡️`);
    }).on('error', (err) => {
        logFailed(err);
        process.exit(1);
    });
}

startServer();
