function compare(a, b) {
    if (a.party < b.party){
        return -1;
    }
    
    if (a.party > b.party){
        return 1;
    }
  
    return 0;
}

function getUserForecasts(json) {
    var userForecasts = {};
    var forecasts = JSON.parse(json);
    
    for (var i = 0; i < forecasts.length; i++) {
        if (!(forecasts[i].userForecastNickname in userForecasts)) {
            userForecasts[forecasts[i].userForecastNickname] = [];
        }
        userForecasts[forecasts[i].userForecastNickname].push(
                {perc:forecasts[i].percentage, party:forecasts[i].partyId}
            );
    }
    
    for (var key in userForecasts) {
        userForecasts[key].sort(compare);
    }
    
    return userForecasts;
}

function getScore(results, userPreds) {
    var sc = 0;
    
    for (var i = 0; i < results.length; i++) {
        sc += Math.abs(results[i].percentage - userPreds[i].perc);
    }

    return sc;
}

function getRanking(resJson, forecastsJson) {
    var results = JSON.parse(resJson);
    results.sort(compare);
    
    var usersForecasts = getUserForecasts(forecastsJson);
    var userScores = [];
    
    for (var u in usersForecasts) {
        var sc = getScore(results, usersForecasts[u]);
        userScores.push({score:sc, user:u});
    }

    userScores.sort(function(a, b){return a.score - b.score});
    
    return JSON.stringify(userScores);
}