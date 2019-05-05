export interface IDataRegion {
    region: string;
    id: string;
    name: string;
    color: string;
    percentage: number;
}

export interface IStatData {
    id: string;
    name: string;
    color: string;
    percentage: number;
}

export interface IStats {
    region: IStatData[];
}
