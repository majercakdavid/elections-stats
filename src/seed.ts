import { createConnection, getRepository } from "typeorm";

import Forecast from "./entity/Forecast";
import Party from "./entity/Party";
import UserForecast from "./entity/UserForecast";

const DBParties = [
    {
        name: "Destre Unite Casapound AEMN",
        id: "CPI",
        icon_url: "https://s3-eu-west-1.amazonaws.com/politiche/loghi/007DESTREUNITECASAPOUNDAEMN_SIE.PNG",
        color: "rgba(0, 0, 0, 0.8)",
        description: "",
    },
    {
        name: "Partito Pirata",
        id: "PP",
        icon_url: "https://s3-eu-west-1.amazonaws.com/politiche/loghi/008PARTITOPIRATA_SIE.PNG",
        color: "rgba(234, 119, 4, 0.8)",
        description: "",
    },
    {
        name: "Lega - Salvini Premier",
        id: "LG",
        icon_url: "https://s3-eu-west-1.amazonaws.com/politiche/loghi/011LEGASALVINIPREMIER_SIE.PNG",
        color: "rgba(0, 99, 24, 0.8)",
        description: "Comprende membri di Movimento Nazionale per la Sovranità.",
    },
    {
        name: "Popolo Della Famiglia - Alternativa Popolare",
        id: "PDF",
        icon_url:
            "https://s3-eu-west-1.amazonaws.com/politiche/loghi/012POPOLODELLAFAMIGLIAALTERNATIVAPOPOLARE_SIE.PNG",
        color: "rgba(37, 60, 163, 0.8)",
        description: "",
    },
    {
        name: "Federazione Dei Verdi",
        id: "FDV",
        icon_url: "https://s3-eu-west-1.amazonaws.com/politiche/loghi/013FEDERAZIONEDEIVERDI_SIE.PNG",
        color: "rgba(22, 135, 0, 0.8)",
        description: "Comprende membri di Verdi, Possibile, Green Italia, Grüne e Fronte Verde",
    },
    {
        name: "Movimento 5 Stelle",
        id: "M5S",
        icon_url: "https://s3-eu-west-1.amazonaws.com/politiche/loghi/014MOVIMENTOCINQUESTELLECOPIA_SIE.PNG",
        color: "rgba(250, 250, 0, 0.8)",
        description: "",
    },
    {
        name: "Popolari Per L'Italia",
        id: "PPI",
        icon_url: "https://s3-eu-west-1.amazonaws.com/politiche/loghi/015POPOLARIPERLITALIA_SIE.PNG",
        color: "rgba(28, 1, 117, 0.8)",
        description: "",
    },
    {
        name: "Südtiroler Volksparteti",
        id: "SVP",
        icon_url: "https://s3-eu-west-1.amazonaws.com/politiche/loghi/016SUDTIROLERVOLKSPARTEI_SIE.PNG",
        color: "rgba(112, 112, 112, 0.8)",
        description: "Comprende membri di PATT e SSk",
    },
    {
        name: "La Sinistra",
        id: "LS",
        icon_url:
            "https://s3-eu-west-1.amazonaws.com/politiche/loghi/" +
            "021SINISTRARIFONDAZIONECOMUNISTASINISTRAEUROPEASINISTRAITALIANA_SIE.PNG",
        color: "rgba(193, 27, 27, 0.8)",
        description: "Comprende membri di Sinistra Italiana, Rifondazione Comunista e ÉViva",
    },
    {
        name: "Partito Animalista Italiano",
        id: "PAI",
        icon_url: "https://s3-eu-west-1.amazonaws.com/politiche/loghi/028PARTITOANIMALISTAITALIANO_SIE.PNG",
        color: "rgba(255, 22, 22, 0.8)",
        description: "",
    },
    {
        name: "Partito Democratico",
        id: "PD",
        icon_url: "https://s3-eu-west-1.amazonaws.com/politiche/loghi/029PARTITODEMOCRATICO_SIE.PNG",
        color: "rgba(237, 122, 0, 0.8)",
        description: "Comprende membri di Articolo Uno, DemoS, e Campo Progressista",
    },
    {
        name: "Forza Italia",
        id: "FI",
        icon_url: "https://s3-eu-west-1.amazonaws.com/politiche/loghi/030FORZAITALIA_SIE.PNG",
        color: "rgba(0, 15, 91, 0.8)",
        description: "Comprende membri di UdC, MpA, IDeA, CP, PLI, NPSI, EpI, DC, PP e Italia Madre",
    },
    {
        name: "+Europa - Italia In Comune - PDE",
        id: "+EU",
        icon_url: "https://s3-eu-west-1.amazonaws.com/politiche/loghi/031PIUEUROPAITALIAINCOMUNE_SIE.PNG",
        color: "rgba(255, 230, 10, 0.8)",
        description: "Comprende membri del PSI, PRI e Team Köllensperger",
    },
    {
        name: "PPA Movimento Politico Pensiero Azione",
        id: "PPA",
        icon_url: "https://s3-eu-west-1.amazonaws.com/politiche/loghi/034PPAMOVIMENTOPOLITICOPENSIEROAZIONE_SIE.PNG",
        color: "rgba(0, 10, 76, 0.8)",
        description: "",
    },
    {
        name: "Autonomie Per L'Europa",
        id: "APE",
        icon_url: "https://s3-eu-west-1.amazonaws.com/politiche/loghi/036AUTONOMIEPERLEUROPA_SIE.PNG",
        color: "rgba(196, 183, 3, 0.8)",
        description: "include: ALPE, Union Valdôtaine, Stella Alpina, UVP, EPAV",
    },
    {
        name: "Fratelli d'Italia",
        id: "FDI",
        icon_url: "https://s3-eu-west-1.amazonaws.com/politiche/loghi/039FRATELLIDITALIA_SIE.PNG",
        color: "rgba(0, 12, 127, 0.8)",
        description: "Comprende membri di DI, #DB, L'Alto Adige nel Cuore, Cuori Italiani, Basta Tasse!",
    },
    {
        name: "Partito Comunista",
        id: "PC",
        icon_url: "https://s3-eu-west-1.amazonaws.com/politiche/loghi/041PARTITOCOMUNISTA_SIE.PNG",
        color: "rgba(191, 0, 0, 0.8)",
        description: "",
    },
    {
        name: "Forza Nuova",
        id: "FN",
        icon_url: "https://s3-eu-west-1.amazonaws.com/politiche/loghi/047FORZANUOVA_SIE.PNG",
        color: "rgba(0, 0, 0, 0.8)",
        description: "",
    },
];

const regions = [
    'Abruzzo',
    'Basilicata',
    'Calabria',
    'Campania',
    'Emilia-Romagna',
    'Friuli-Venezia Giulia',
    'Lazio',
    'Liguria',
    'Lombardia',
    'Marche',
    'Molise',
    'Piemonte',
    'Puglia',
    'Sardegna',
    'Sicilia',
    'Toscana',
    'Trentino-Alto Adige',
    'Umbria',
    'Valle d\'Aosta',
    'Veneto',
    'Estero',
];

createConnection().then(async connection => {
    console.log('Successfully connected to PG database!');
    console.log('Entities: ' + connection.entityMetadatas.map(v => v.name));

    await connection.dropDatabase();
    await connection.runMigrations();

    const userForecastRepo = getRepository(UserForecast);
    const forecastRepo = getRepository(Forecast);
    const partyRepo = getRepository(Party);

    for (const dbparty of DBParties) {
        const party = new Party();
        party.color = dbparty.color;
        party.description = dbparty.description;
        party.iconUrl = dbparty.icon_url;
        party.id = dbparty.id;
        party.name = dbparty.name;

        await partyRepo.save(party);
    }
    const parties = await partyRepo.find();

    if (!process.argv.includes('--test')) {
        return;
    }

    for (const region of regions) {
        for (let i = 1; i < 6; i++) {
            const userEmail = 'test_user_' + region + '_' + i + '@test.it';

            let userForecast = new UserForecast();
            userForecast.email = userEmail;
            userForecast.latestVersion = 1;
            userForecast.nickname = 'test_user_' + region + '_' + i;
            userForecast.region = region;
            userForecast.forecasts = [];

            userForecast = await userForecastRepo.save(userForecast);
            userForecast.forecasts = [];

            let partiesProbs: number[] = [];

            parties.forEach(() => partiesProbs.push(Math.random()));
            const partiesProbsSum = partiesProbs.reduce((acc, val) => val + acc);
            partiesProbs = partiesProbs.map(partyProb => partyProb / partiesProbsSum);

            parties.forEach(async (party, index) => {
                const forecast = new Forecast();
                forecast.party = party;
                forecast.percentage = Math.round(partiesProbs[index] * 1000) / 10;
                forecast.userForecast = userForecast;
                forecast.valid = true;
                forecast.version = 1;

                await forecastRepo.save(forecast);
                userForecast.forecasts.push(forecast);
            });

            await userForecastRepo.save(userForecast);
        }
    }
});
