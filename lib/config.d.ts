export interface Config {
    outputDir: string;
    cachePath: string;
    username: string;
    password: string;
}
export declare const defaultConfig: Config;
export declare function readConfig(): Config;
