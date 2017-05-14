import { Config } from "./config";
import { RenderData } from "./model";
export declare function writeRaw(config: Config, data: RenderData): Promise<void>;
export declare function writeHTML(config: Config, data: RenderData): Promise<void>;
