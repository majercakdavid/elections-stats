import express from 'express';
import { getManager} from 'typeorm';
import {IElectionResults} from "../interface/IElectionResults";
import {rankingQuery, regionStatsQuery, totalStatsQuery} from "../utils/queries.utils";
import {formatDataRegions, getRanking, validateELectionsResults} from "../utils/stats.utils";

const router = require('express').Router();

router.get('/stats', async (req: express.Request, res: express.Response) => {
    await getManager().transaction(async entityManager => {
        const dataRegions = await entityManager.query(regionStatsQuery).catch(
            () => {
                return null;
            },
        );
        const dataTotal = await entityManager.query(totalStatsQuery).catch(
            () => {
                return null;
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
    const results: IElectionResults = req.body;

    if (!validateELectionsResults(results.results)) {
        res.status(400).send('problem with the election results.');
        return;
    }

    await getManager().transaction(async entityManager => {
        const dataRanking = await entityManager.query(rankingQuery).catch(
            () => null,
        );

        if (!dataRanking) {
            res.status(500).send("problem retrieving ranking!");
            return;
        }
        const leadboard = getRanking(results.results, dataRanking);
        res.json({message: "ok", data: leadboard});
    });
});

export default router;
