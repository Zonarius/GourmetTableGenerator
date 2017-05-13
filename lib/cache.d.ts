import { MealDetail } from "gourmet-api";
import { Config } from './config';
export declare class Cache {
    private config;
    data: {
        [id: number]: MealDetail;
    };
    constructor(config: Config);
    readCache(): void;
    saveCache(): void;
}
