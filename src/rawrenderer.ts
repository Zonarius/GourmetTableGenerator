import * as fs from 'fs';
import * as path from 'path';

import { Config } from "./config";
import { RenderData } from "./model";

export function writeRaw(config: Config, data: RenderData): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        fs.writeFile(path.join(config.outputDir, 'raw.json'), JSON.stringify(data, undefined, 2), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
