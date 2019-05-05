export interface IElectionResults {
    results: IElectionResult[];
}

export interface IElectionResult {
    party: string;
    percentage: number;
}
