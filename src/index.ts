import * as fs from 'fs';
import { GourmetAPI, MealDetail, MealListItem } from "gourmet-api";
import * as moment from 'moment';
import * as path from 'path';

import { Cache } from './cache';
import { Config, readConfig } from './config';
import { CacheChanges, RenderData } from "./model";
import { writeRaw } from "./rawrenderer";

const api = new GourmetAPI();
const config = readConfig();
const cache = new Cache(config);
cache.readCache();

(async () => {
    const changes = await fetchMeals();
    const data: RenderData = {
        version: getCurrentVersion(),
        fetchTime: moment().toISOString(),
        changes,
        data: map(cache.data)
    };
    writeRaw(config, data);
})();

async function fetchMeals(): Promise<CacheChanges> {
    await api.login(config.username, config.password);
    const list = await api.getMealList(true);
    const newMeals: MealListItem[] = [];
    const changes = list.reduce((ch, meal) => {
        const cached = cache.data[meal.id];
        if (!cached) {
            newMeals.push(meal);
        } else if (cached.available !== meal.available) {
            if (meal.available) {
                ch.available.push(cached);
            } else {
                ch.unavailable.push(cached);
            }
        }
        return ch;
    }, emptyChanges());

    const cacheFill = newMeals
        .map(it => api.getMealDetail(it.id)
            .then(res => {
                cache.data[res.id] = res;
                changes.new.push(res);
            }));
    await Promise.all(cacheFill);
    cache.saveCache();

    return changes;
}

function getCurrentVersion(): string {
    const file = fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8');
    return JSON.parse(file)['version'];
}

function emptyChanges(): CacheChanges {
    return {
        available: [],
        unavailable: [],
        new: []
    };
}

function map<T>(obj: { [key: number]: T }): T[] {
    return Object.keys(obj).map(key => obj[key as any]);
}
