-- SELECT DISTINCT "region" FROM "user_forecast";
-- WITH "votes_per_region" AS (SELECT COUNT(*) FROM "user_forecast")
SELECT "uf"."region", "f"."partyId" AS "id", "p"."name", "p"."iconUrl", "p"."color", "p"."description", SUM("f"."percentage")/"rc"."count" AS "totalPercentage" from "forecast" AS "f"
    JOIN "user_forecast" AS "uf" ON "f"."userForecastId" = "uf"."id" AND "f"."version" = "uf"."latestVersion"
    JOIN (SELECT "region", COUNT(*) FROM "user_forecast" GROUP BY "region") AS "rc" ON "rc"."region" = "uf"."region"
    JOIN "party" AS "p" ON "p"."id" =  "f"."partyId"
    GROUP BY "uf"."region", "f"."partyId", "rc"."count", "p"."name", "p"."iconUrl", "p"."color", "p"."description"
    ORDER BY "uf"."region", "f"."partyId";


