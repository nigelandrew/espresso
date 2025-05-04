import {RoastLevel} from "./roast-level.ts";

export type CoffeeType = {
    id: string; // GUID
    name: string;
    roasterId: string;
    originLocation: string;
    elevation: string; // e.g. "1,800m"
    roastLevel: RoastLevel;
    flavorNotes?: string;
};
