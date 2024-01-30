import 'reflect-metadata';
import 'module-alias/register';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import Container from 'typedi';
import { Logger } from './libs/logger';
import { useExpressServer, useContainer as routingContainer } from 'routing-controllers';
import * as http from 'http';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

const baseDir = __dirname;
const expressApp = express();

routingContainer(Container);

useExpressServer(expressApp, {
	routePrefix: process.env.API_ROOT,
	defaultErrorHandler: false,
	controllers: [baseDir + '/endpoints/**/controllers/*{.js,.ts}']
});

expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(bodyParser.json());

const server = http.createServer(expressApp);
server.listen(process.env.PORT, () => {
	Logger.info('Server', 'Application running on', `${process.env.HOSTNAME}:${process.env.PORT}${process.env.API_ROOT}`);
});

process.on('unhandledRejection', (error) => {
	Logger.error('Server', 'unhandledRejectionError :', `${error}`);
});
