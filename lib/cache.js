"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class Cache {
    constructor(config) {
        this.config = config;
    }
    readCache() {
        if (fs.existsSync(this.config.cachePath)) {
            this.data = JSON.parse(fs.readFileSync(this.config.cachePath, 'utf-8'));
        }
        else {
            this.data = {};
        }
    }
    saveCache() {
        fs.writeFileSync(this.config.cachePath, JSON.stringify(this.data, undefined, 2));
    }
}
exports.Cache = Cache;
