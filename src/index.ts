// Needed for the TypeORM
import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import routes from './route';

require('dotenv').config();
const app = express();
const port = 3000;

// cors
app.use(
    cors({
        origin: '*',
    }),
);

// createConnection method will automatically read connection options
// from your ormconfig file or environment variables
createConnection().then(connection => {
    console.log('Successfully connected to PG database!');
    console.log('Entities: ' + connection.entityMetadatas.map(v => v.name));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/stats-service', routes);
    app.get('/', (req, res) => res.status(200).send("Election API"));
    app.get('/*', (req, res) => res.status(404).send("Resources Not Found"));

    const server = app.listen(port, 'localhost', () => {
        if (server !== null) {
            console.log("app running on port.", server.address());
        }
        app.emit("appStarted");
    });
}).catch(reason => {
    console.log(reason);
});

export default app;
