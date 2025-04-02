import React from 'react';
import { Brew } from '@/types/brew.ts';
import BrewTable from './BrewTable';

type BrewHistoryProps = {
    brews: Brew[];
    onDelete: (id: string) => void;
};

const BrewHistory: React.FC<BrewHistoryProps> = ({ brews, onDelete }) => {
    if (brews.length === 0) return <p className="mt-4">No brews saved yet.</p>;

    return (
        <div>
            <BrewTable brews={brews} onDelete={onDelete} />
        </div>
    );
};

export default BrewHistory;