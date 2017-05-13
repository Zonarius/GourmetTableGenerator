"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
function writeRaw(config, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path.join(config.outputDir, 'raw.json'), JSON.stringify(data, undefined, 2), (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
exports.writeRaw = writeRaw;
