import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Brew } from "@/types/brew";
import { CoffeeType } from "@/types/coffee";

type BrewFormProps = {
    onSubmitBrew: (brew: Omit<Brew, 'timestamp' | 'id'>) => void;
};

const BrewForm: React.FC<BrewFormProps> = ({ onSubmitBrew }) => {

    const [coffeeTypes, setCoffeeTypes] = useState<CoffeeType[]>([]);

    useEffect(() => {
        fetch("http://localhost:4000/coffee-types")
            .then((res) => res.json())
            .then((data) => {
                console.log("Coffee types loaded:", data);
                setCoffeeTypes(data);
            })
            .catch((err) => console.error("Failed to fetch coffee types:", err));
    }, []);

    const [formData, setFormData] = useState<Omit<Brew, 'timestamp' | 'id'>>({
        coffeeWeight: 18, // default slider value
        brewTime: 30,
        yieldWeight: 36,
        boilerTemperature: 118,
        notes: '',
        coffeeType: undefined,
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

    const handleCoffeeTypeChange = (id: string) => {
        const selected = coffeeTypes.find((ct) => ct.id === id);
        setFormData((prev) => ({ ...prev, coffeeType: selected }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmitBrew(formData); // pass brew data up to App
        setFormData({
            coffeeWeight: 18,
            brewTime: 30,
            yieldWeight: 36,
            boilerTemperature: 118,
            notes: '',
            coffeeType: undefined,
        });
    };

    return(
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
                Boiler Temperature (C):
                <input
                    type="number"
                    name="boilerTemperature"
                    value={formData.boilerTemperature.toString()}
                    onChange={handleChange}
                />
            </label>

                <label>
                    Coffee Type:
                    <select
                        id="coffeeType"
                        name="coffeeType"
                        value={formData.coffeeType?.id ?? ""}
                        onChange={(e) => handleCoffeeTypeChange(e.target.value)}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select a coffee</option>
                        {coffeeTypes.map((coffee) => (
                            <option key={coffee.id} value={coffee.id}>
                                {coffee.name} — {coffee.roaster}
                            </option>
                        ))}
                    </select>
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
