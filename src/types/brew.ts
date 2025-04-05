import { CoffeeType } from './coffee';

export type Brew = {
    id: string;
    coffeeWeight: number;
    brewTime: number;
    yieldWeight: number;
    boilerTemperature: number;
    grindSetting: number;
    notes: string;
    timestamp: string;
    coffeeType?: CoffeeType;
};

export type BrewInput = Omit<Brew, 'id' | 'timestamp'>;
