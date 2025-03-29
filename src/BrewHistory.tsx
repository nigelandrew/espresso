import React from 'react';
import BrewChart from './BrewChart.tsx';
import BrewTable from './BrewTable';

type Brew = {
    id: string;
    coffeeWeight: number;
    brewTime: number;
    yieldWeight: number;
    boilerTemperature: number;
    notes: string;
    timestamp: string; // ISO format
};

type BrewHistoryProps = {
    brews: Brew[];
    onDelete: (id: string) => void;
};

const BrewHistory: React.FC<BrewHistoryProps> = ({ brews, onDelete }) => {
    if (brews.length === 0) return <p className="mt-4">No brews saved yet.</p>;

    return (
        <div>
            <BrewChart brews={brews} />
            <BrewTable brews={brews} onDelete={onDelete} />
        </div>
    );
};

export default BrewHistory;