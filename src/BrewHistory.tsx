import React from 'react';
import { Brew } from '@/types/brew.ts';
import BrewTable from './BrewTable';
import { useState } from "react";

type BrewHistoryProps = {
    brews: Brew[];
    onDelete: (id: string) => void;
};

const BrewHistory: React.FC<BrewHistoryProps> = ({ brews, onDelete }) => {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    if (brews.length === 0) return <p className="mt-4">No brews saved yet.</p>;

    const filteredBrews = brews.filter((brew) => {
        const brewDate = new Date(brew.timestamp);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (
            (!start || brewDate >= start) &&
            (!end || brewDate <= end)
        );
    });

    return (
        <div>
            <div className="flex gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>
            </div>
            <BrewTable brews={filteredBrews} onDelete={onDelete} />
        </div>
    );
};

export default BrewHistory;