import {IDataRegion} from "../interface/IDataRegion";
import {IElectionResult} from "../interface/IElectionResults";
import {IUserPrediction, IUserScore} from "../interface/IUserPredictions";

const partiesId = [ 'CPI',
    'PP',
    'LG',
    'PDF',
    'FDV',
    'M5S',
    'PPI',
    'SVP',
    'LS',
    'PAI',
    'PD',
    'FI',
    '+EU',
    'PPA',
    'APE',
    'FDI',
    'PC',
    'FN' ];

export function formatDataRegions(dataRegions: IDataRegion[]) {
    const regions = distinctRegions(dataRegions);
    const result = {};

    // init result
    for (const region of regions) {
        // @ts-ignore
        result[region] = Array.from(dataRegions.filter(
            d => d.region === region,
        ).map(
            d => ({
                color: d.color,
                id: d.id,
                name: d.name,
                percentage: d.percentage,
            }),
        ));
    }
    return result;
}

function distinctRegions(dataRegions: IDataRegion[]): string[] {
    const result = [];
    const map = new Map();

    for (const data of dataRegions) {
        if (!map.has(data.region)) {
            map.set(data.region, true);
            result.push(data.region);
        }
    }
    return result;
}

export function validateELectionsResults(results: IElectionResult[]): boolean {
    let sum = 0;
    for (const result of results) {
        if (!partiesId.includes(result.party) || result.percentage < 0) {
            return false;
        }
        sum += result.percentage;
    }
    return sum === 100;
}
////////////////////////////////////////////
/////////  Rewriting Wojtek Functions  /////
////////////////////////////////////////////

function compare(a: IElectionResult, b: IElectionResult) {
    if (a.party < b.party) {
        return -1;
    }

    if (a.party > b.party) {
        return 1;
    }

    return 0;
}

function getUserForecasts(forecasts: IUserPrediction[]): Map<string, []> {
    const userForecasts = new Map();

    for (const forecast of forecasts) {
        if (!(userForecasts.has(forecast.nickname))) {
            userForecasts.set(forecast.nickname, []);
        }
        userForecasts.get(forecast.nickname).push(
            {perc: forecast.percentage, party: forecast.partyId},
        );
    }

    userForecasts.forEach((value, key, map) => {
        map.get(key).sort(compare);
    });

    return userForecasts;
}

// @ts-ignore
function getScore(electionResults: IElectionResult[], userPreds) {
    let sc = 0;

    for (let i = 0; i < electionResults.length; i++) {
        sc += Math.abs(electionResults[i].percentage - userPreds[i].perc);
    }

    return sc;
}

export function getRanking(electionsResults: IElectionResult[], predictions: IUserPrediction[]) {
    electionsResults.sort(compare);

    const usersForecasts = getUserForecasts(predictions);
    const userScores: IUserScore[] = [];

    usersForecasts.forEach((value, key, map) => {
        const sc = getScore(electionsResults, value);
        userScores.push({user: key, score: sc});
    });

    userScores.sort((a, b) => a.score - b.score);

    return userScores;
}
