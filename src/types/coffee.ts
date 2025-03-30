export type CoffeeType = {
    id: string; // GUID
    name: string;
    roaster: string;
    originLocation: string;
    elevation: string; // e.g. "1,800m"
    roastLevel: 'light' | 'medium' | 'dark';
    flavorNotes?: string;
};
