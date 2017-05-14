"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promisify = require("es6-promisify");
const fs = require("fs");
const nunjucks = require("nunjucks");
const path = require("path");
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const render = promisify(nunjucks.render);
function writeRaw(config, data) {
    return writeFile(path.join(config.outputDir, 'raw.json'), JSON.stringify(data, undefined, 2));
}
exports.writeRaw = writeRaw;
async function writeHTML(config, data) {
    const output = await render(path.join(__dirname, '..', 'htmlsrc', 'index.html'), data);
    await writeFile(path.join(__dirname, '..', 'html', 'index.html'), output);
}
exports.writeHTML = writeHTML;
