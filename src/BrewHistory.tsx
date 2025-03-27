import React from 'react';

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
            <h2 className="text-2xl font-semibold mb-4 mt-4">Brew History</h2>
            <ul>
                {brews.map((brew, index) => (
                    <li key={index}>
                        <strong>{brew.coffeeWeight}g</strong> in → {brew.yieldWeight}g out over {brew.brewTime}s
                        <br />
                        <em>{brew.notes}</em>
                        <br />
                        <small>{new Date(brew.timestamp).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BrewHistory;