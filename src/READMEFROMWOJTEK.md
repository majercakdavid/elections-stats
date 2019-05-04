getRanking function from ranking.js expects two JSON strings:  
results =  '[{"party":string, "percentage":float} ...]'  
and forecasts: '[{"userForecastEmail":string, "userForecastNickname":string, "partyId":string?, "percentage":float} ...]'  
The latter should be achievable by using the query from ranking.sql and converting it into a JSON