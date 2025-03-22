import React, { useState, ChangeEvent, FormEvent } from 'react';

type BrewFormData = {
    coffeeWeight: number;
    brewTime: number;
    yieldWeight: number;
    notes: string;
};

const BrewForm: React.FC = () => {
    const [formData, setFormData] = useState<BrewFormData>({
        coffeeWeight: 0,
        brewTime: 0,
        yieldWeight: 0,
        notes: '',
    });

    const numberFields = new Set(['coffeeWeight', 'brewTime', 'yieldWeight']);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newValue = numberFields.has(name) ? Number(value) : value;
        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Brew entry:', formData);
        setFormData({
            coffeeWeight: 0,
            brewTime: 0,
            yieldWeight: 0,
            notes: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label>
                Coffee Weight (g): {formData.coffeeWeight}
                <input
                    type="range"
                    name="coffeeWeight"
                    min={10}
                    max={25}
                    step={0.1}
                    value={formData.coffeeWeight}
                    onChange={handleChange}
                />
            </label>
            <label>
                Brew Time (sec):
                <input type="number" name="brewTime" value={formData.brewTime} onChange={handleChange} />
            </label>
            <label>
                Yield Weight (g):
                <input type="number" name="yieldWeight" value={formData.yieldWeight} onChange={handleChange} />
            </label>
            <label>
                Notes:
                <textarea name="notes" value={formData.notes} onChange={handleChange}></textarea>
            </label>
            <button type="submit">Save Brew</button>
        </form>
    );
};

export default BrewForm;
