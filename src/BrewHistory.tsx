import React from 'react';

type Brew = {
    coffeeWeight: number;
    brewTime: number;
    yieldWeight: number;
    notes: string;
};

type BrewHistoryProps = {
    brews: Brew[];
};

const BrewHistory: React.FC<BrewHistoryProps> = ({ brews }) => {
    if (brews.length === 0) return <p>No brews saved yet.</p>;

    return (
        <div>
            <h2>Brew History</h2>
            <ul>
                {brews.map((brew, index) => (
                    <li key={index}>
                        <strong>{brew.coffeeWeight}g</strong> in → {brew.yieldWeight}g out over {brew.brewTime}s
                        <br />
                        <em>{brew.notes}</em>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BrewHistory;