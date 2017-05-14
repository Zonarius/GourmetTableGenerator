import * as promisify from 'es6-promisify';
import * as fs from 'fs';
import * as nunjucks from 'nunjucks';
import * as path from 'path';

import { Config } from "./config";
import { RenderData } from "./model";

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const render = promisify(nunjucks.render);

export function writeRaw(config: Config, data: RenderData): Promise<void> {
    return writeFile(path.join(config.outputDir, 'raw.json'), JSON.stringify(data, undefined, 2));
}

export async function writeHTML(config: Config, data: RenderData): Promise<void> {
    const output: string = await render(path.join(__dirname, '..', 'htmlsrc', 'index.html'), data);
    await writeFile(path.join(__dirname, '..', 'html', 'index.html'), output);
}
