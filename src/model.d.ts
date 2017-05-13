import { MealDetail } from "gourmet-api";

interface CacheChanges {
    available: MealDetail[];
    unavailable: MealDetail[];
    new: MealDetail[];
}

interface RenderData {
    version: string;
    fetchTime: string;
    changes: CacheChanges;
    data: MealDetail[];
}
