export type Maintenance = {
    id: string;
    maintenanceDate: string;  // ISO string
    type: string;            // e.g. "Descale", "Grouphead Cleaning", etc.
    notes: string;
};
