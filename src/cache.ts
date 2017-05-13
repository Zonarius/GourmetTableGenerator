import * as fs from 'fs';
import { MealDetail } from "gourmet-api";
import { Config } from './config';

export class Cache {
    public data: { [id: number]: MealDetail };

    constructor(private config: Config) {
    }

    public readCache(): void {
        if (fs.existsSync(this.config.cachePath)) {
            this.data = JSON.parse(fs.readFileSync(this.config.cachePath, 'utf-8'));
        } else {
            this.data = {};
        }
    }

    public saveCache(): void {
        fs.writeFileSync(this.config.cachePath, JSON.stringify(this.data, undefined, 2));
    }
}
