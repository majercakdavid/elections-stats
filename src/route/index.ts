import express from 'express';
import { getManager} from 'typeorm';
import {regionStatsQuery, totalStatsQuery} from "../utils/queries.utils";
import {formatDataRegions} from "../utils/stats.utils";

const router = require('express').Router();

router.get('/stats', async (req: express.Request, res: express.Response) => {
    await getManager().transaction(async entityManager => {
        const dataRegions = await entityManager.query(regionStatsQuery).catch(
            () => {
                return null;
            },
        ).then(
            value => {
                return value;
            },
        );
        const dataTotal = await entityManager.query(totalStatsQuery).catch(
            () => {
                return null;
            },
        ).then(
            value => {
                return value;
            },
        );

        if (!dataTotal || !dataRegions) {
            res.status(500).send("problem retrieving stats!");
            return;
        }
        const result = formatDataRegions(dataRegions);
        // @ts-ignore
        result.Totale = dataTotal;
        res.json({message: "ok", stats: result});
    });
});

router.get('/final-results', async (req: express.Request, res: express.Response) => {
    res.status(200).send('Not implemented yet');
});

export default router;
