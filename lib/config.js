"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.defaultConfig = {
    outputDir: "output",
    cachePath: 'cache.json',
    username: '',
    password: ''
};
const configPath = 'config.json';
function readConfig() {
    const fileConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    return Object.assign({}, exports.defaultConfig, fileConfig);
}
exports.readConfig = readConfig;
