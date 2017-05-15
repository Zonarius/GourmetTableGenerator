"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promisify = require("es6-promisify");
const fs = require("fs-extra");
const nunjucks = require("nunjucks");
const path = require("path");
const renderTemplate = promisify(nunjucks.render);
async function render(config, data) {
    const output$ = renderTemplate(path.join(__dirname, '..', 'htmlsrc', 'index.nunjucks'), data);
    await fs.mkdirp(config.outputDir);
    await fs.copy(path.join(__dirname, '..', 'html'), config.outputDir);
    const raw$ = fs.writeFile(path.join(config.outputDir, 'raw.json'), JSON.stringify(data, undefined, 2));
    const output = await output$;
    const template$ = fs.writeFile(path.join(config.outputDir, 'index.html'), output);
    await raw$;
    await template$;
}
exports.render = render;
