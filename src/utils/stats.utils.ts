import {IDataRegion} from "../interface/IDataRegion";

export function formatDataRegions(dataRegions: IDataRegion[]) {
    const regions = distinctRegions(dataRegions);
    const result = {};

    // init result
    for (const region of regions) {
        // @ts-ignore
        result[region] = Array.from(dataRegions.filter(
            d => d.region === region,
        ).map(
            d => ({
                color: d.color,
                id: d.id,
                name: d.name,
                percentage: d.percentage,
            }),
        ));
    }
    return result;
}

function distinctRegions(dataRegions: IDataRegion[]): string[] {
    const result = [];
    const map = new Map();

    for (const data of dataRegions) {
        if (!map.has(data.region)) {
            map.set(data.region, true);
            result.push(data.region);
        }
    }
    return result;
}
