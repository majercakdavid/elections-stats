export const regionStatsQuery = 'SELECT "region", "id", "name", "color", "percentage" FROM party\n' +
    'JOIN (SELECT sum(percentage)/count(uf."id") as percentage, count(uf."id"), "region", "partyId" FROM forecast AS f\n' +
    'JOIN "user_forecast" AS "uf" ON "f"."userForecastId" = "uf"."id" AND "f"."version" = "uf"."latestVersion" AND f."valid" = true\n' +
    'GROUP BY "region", "partyId") AS stats ON party."id" = "partyId"\n' +
    'ORDER BY "region", "id"';

export const totalStatsQuery = 'SELECT "partyId" as "id", "name", "color", SUM(percentage)/"p"."count" as "percentage" FROM "forecast" AS "f"\n' +
    'JOIN "user_forecast" AS "uf" \n' +
    'ON "f"."userForecastId" = "uf"."id" AND "f"."version" = "uf"."latestVersion"\n' +
    'JOIN "party" AS "p" ON "p"."id" =  "f"."partyId"\n' +
    'WHERE "f"."valid" = true\n' +
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
