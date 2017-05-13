import * as fs from 'fs';

export interface Config {
    outputDir: string;
    cachePath: string;
    username: string;
    password: string;
}

export const defaultConfig: Config = {
    outputDir: "output",
    cachePath: 'cache.json',
    username: '',
    password: ''
};

const configPath = 'config.json';

export function readConfig(): Config {
    const fileConfig: Config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    return {
        ...defaultConfig,
        ...fileConfig
    };
}
