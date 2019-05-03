import express from 'express';
import { getManager, getRepository } from 'typeorm';

import { IClientForecastInput, IClientGetForecastInput } from '../interface/IClientForecast';

import Forecast from '../entity/Forecast';
import Party from '../entity/Party';
import UserForecast from '../entity/UserForecast';

const router = require('express').Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send("Election stats API");
});

router.get('/stats', async (req: express.Request, res: express.Response) => {
    res.status(200).send('Not implemented yet');
});

router.get('/final-results', async (req: express.Request, res: express.Response) => {
    res.status(200).send('Not implemented yet');
});

export default router;
