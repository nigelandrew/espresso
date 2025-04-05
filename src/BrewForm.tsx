import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Brew } from "@/types/brew";
import { CoffeeType } from "@/types/coffee";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
        grindSetting: 0,
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
            grindSetting: 0,
            notes: '',
            coffeeType: undefined,
        });
    };

    return(
        <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Log Brew</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                Coffee Weight (g): {formData.coffeeWeight}
                <Input
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
                <Input
                    type="number"
                    name="brewTime"
                    value={formData.brewTime}
                    onChange={handleChange}
                    className="w-full"
                />
            </label>

            <label>
                Yield Weight (g):
                <Input
                    type="number"
                    name="yieldWeight"
                    value={formData.yieldWeight.toString()}
                    onChange={handleChange}
                />
            </label>

                <label>
                    Boiler Temperature (C):
                    <Input
                        type="number"
                        name="boilerTemperature"
                        value={formData.boilerTemperature.toString()}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Grind Setting:
                    <Input
                        className="transition-all duration-400 focus:ring-2 focus:ring-blue-500"
                        type="number"
                        name="grindSetting"
                        value={formData.grindSetting.toString()}
                        onChange={handleChange}
                    />
                </label>

                <label className="block text-sm font-medium mb-1 text-gray-300">
                    Coffee Type:
                </label>

                <Select
                    value={formData.coffeeType?.id ?? ""}
                    onValueChange={(id) => handleCoffeeTypeChange(id)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a coffee" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-zinc-800 text-black dark:text-white">
                        {coffeeTypes.map((coffee) => (
                            <SelectItem key={coffee.id} value={coffee.id}>
                                {coffee.name} — {coffee.roaster}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>


                <label>
                Notes:
                <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                ></Textarea>
            </label>

            <Button type="submit" className="w-full">Save Brew</Button>
        </form>
        </div>
    );
};

export default BrewForm;
