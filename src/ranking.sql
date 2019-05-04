/* this one is for prediction ranking;
the output of this query should be converted to json and together
with the election results used as an input to the 
javascript getRanking function*/
SELECT forecast.userForecastEmail, 
	forecast.userForecastNickname,
	forecast.partyId, 
	forecast.percentage
FROM forecast
	JOIN user_forecast
	ON user_forecast.email = forecast.userForecastEmail
	AND user_forecast.nickname = forecast.userForecastNickname
WHERE forecast.version = user_forecast.latestVersion
AND forecast.valid;
