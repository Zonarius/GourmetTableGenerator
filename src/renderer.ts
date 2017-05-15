import * as promisify from 'es6-promisify';
import * as fs from 'fs-extra';
import * as nunjucks from 'nunjucks';
import * as path from 'path';

import { Config } from "./config";
import { RenderData } from "./model";

const renderTemplate = promisify(nunjucks.render);

export async function render(config: Config, data: RenderData): Promise<void> {
    const output$: Promise<string> = renderTemplate(path.join(__dirname, '..', 'htmlsrc', 'index.nunjucks'), data);

    await fs.mkdirp(config.outputDir);
    await fs.copy(path.join(__dirname, '..', 'html'), config.outputDir);
    const raw$ = fs.writeFile(path.join(config.outputDir, 'raw.json'), JSON.stringify(data, undefined, 2));
    const output = await output$;
    const template$ = fs.writeFile(path.join(config.outputDir, 'index.html'), output);

    await raw$;
    await template$;
}
