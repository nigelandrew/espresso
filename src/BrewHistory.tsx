import React from 'react';
import BrewChart from './BrewChart.tsx';
import BrewTable from './BrewTable';

type Brew = {
    coffeeWeight: number;
    brewTime: number;
    yieldWeight: number;
    notes: string;
    timestamp: string; // ISO format
};

type BrewHistoryProps = {
    brews: Brew[];
};

const BrewHistory: React.FC<BrewHistoryProps> = ({ brews }) => {
    if (brews.length === 0) return <p className="mt-4">No brews saved yet.</p>;

    return (
        <div>
            <BrewChart brews={brews} />
            <BrewTable brews={brews} />
        </div>
    );
};

export default BrewHistory;