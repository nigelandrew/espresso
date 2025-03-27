import React, { useState, ChangeEvent, FormEvent } from 'react';

type Brew = {
    coffeeWeight: number;
    brewTime: number;
    yieldWeight: number;
    notes: string;
    timestamp: string;
};

type BrewFormProps = {
    onSubmitBrew: (brew: Omit<Brew, 'timestamp'>) => void;
};

const BrewForm: React.FC<BrewFormProps> = ({ onSubmitBrew }) => {
    const [formData, setFormData] = useState<Omit<Brew, 'timestamp'>>({
        coffeeWeight: 18, // default slider value
        brewTime: 30,
        yieldWeight: 36,
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
        onSubmitBrew(formData); // pass brew data up to App
        setFormData({
            coffeeWeight: 18,
            brewTime: 30,
            yieldWeight: 36,
            notes: '',
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4 mt-4">Log Brew</h2>
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
                <input
                    type="number"
                    name="brewTime"
                    value={formData.brewTime.toString()}
                    onChange={handleChange}
                />
            </label>

            <label>
                Yield Weight (g):
                <input
                    type="number"
                    name="yieldWeight"
                    value={formData.yieldWeight.toString()}
                    onChange={handleChange}
                />
            </label>

            <label>
                Notes:
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                ></textarea>
            </label>

            <button type="submit">Save Brew</button>
        </form>
        </div>
    );
};

export default BrewForm;
