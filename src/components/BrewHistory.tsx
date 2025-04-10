import React from 'react';
import {Brew} from '@/types/brew.ts';
import BrewTable from './BrewTable.tsx';
import {useState} from "react";

type BrewHistoryProps = {
    brews: Brew[];
    onDelete: (id: string) => void;
};

const BrewHistory: React.FC<BrewHistoryProps> = ({brews, onDelete}) => {
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
        <div className="mb-6 bg-malta-950 p-4 rounded-xl shadow-md">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-malta-200 mb-1">
                        Start Date
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="
          w-full p-2 rounded-md
          bg-malta-900 border border-malta-800
          text-malta-100
          focus:outline-none focus:ring-2 focus:ring-malta-400
        "
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-malta-200 mb-1">
                        End Date
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="
          w-full p-2 rounded-md
          bg-malta-900 border border-malta-800
          text-malta-100
          focus:outline-none focus:ring-2 focus:ring-malta-400
        "
                    />
                </div>
            </div>

            <div className="mt-4">
                <BrewTable brews={filteredBrews} onDelete={onDelete}/>
            </div>
        </div>

    );
};

export default BrewHistory;