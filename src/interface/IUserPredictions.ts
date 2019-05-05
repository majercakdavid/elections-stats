export interface IUserPredictions {
    forecasts: IUserPrediction[];
}

export interface IUserPrediction {
    nickname: string;
    percentage: number;
    partyId: string;
}

export interface IUserScore {
    score: number;
    user: string;
}
