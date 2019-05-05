export const regionStatsQuery = 'SELECT "uf"."region", "f"."partyId" AS "id", "p"."name", "p"."color", SUM("f"."percentage")/"rc"."count" AS "percentage" from "forecast" AS "f"\n' +
    '    JOIN "user_forecast" AS "uf" ON "f"."userForecastId" = "uf"."id" AND "f"."version" = "uf"."latestVersion"\n' +
    '    JOIN (SELECT "region", COUNT(*) FROM "user_forecast" GROUP BY "region") AS "rc" ON "rc"."region" = "uf"."region"\n' +
    '    JOIN "party" AS "p" ON "p"."id" =  "f"."partyId"\n' +
    '    GROUP BY "uf"."region", "f"."partyId", "rc"."count", "p"."name", "p"."iconUrl", "p"."color", "p"."description"\n' +
    '    ORDER BY "uf"."region", "f"."partyId";';

export const totalStatsQuery = 'SELECT "partyId" as "id", "name", "color", SUM(percentage)/"p"."count" as "percentage" FROM "forecast" AS "f"\n' +
    'JOIN "user_forecast" AS "uf" \n' +
    'ON "f"."userForecastId" = "uf"."id" AND "f"."version" = "uf"."latestVersion"\n' +
    'JOIN "party" AS "p" ON "p"."id" =  "f"."partyId"\n' +
    'GROUP BY "partyId", "name", "color"\n' +
    'ORDER BY "partyId";';

export const rankingQuery = 'SELECT "nickname",\n' +
    '\tforecast."partyId", \n' +
    '\tforecast."percentage"\n' +
    'FROM forecast\n' +
    '\tJOIN user_forecast\n' +
    '\tON user_forecast."id" = forecast."userForecastId"\n' +
    'WHERE forecast."version" = user_forecast."latestVersion"\n' +
    'AND forecast."valid";';
