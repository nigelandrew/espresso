import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import {Brew} from "@/types/brew.ts";
import {CoffeeType} from "@/types/coffee.ts";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";

type BrewFormProps = {
    onSubmitBrew: (brew: Omit<Brew, 'timestamp' | 'id'>) => void;
};

const BrewForm: React.FC<BrewFormProps> = ({onSubmitBrew}) => {
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
        coffeeWeight: 18,
        brewTime: 30,
        yieldWeight: 36,
        boilerTemperature: 118,
        grindSetting: 0,
        notes: '',
        coffeeType: undefined,
    });

    const numberFields = new Set(['coffeeWeight', 'brewTime', 'yieldWeight']);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        const newValue = numberFields.has(name) ? Number(value) : value;

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleCoffeeTypeChange = (id: string) => {
        const selected = coffeeTypes.find((ct) => ct.id === id);
        setFormData((prev) => ({...prev, coffeeType: selected}));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmitBrew(formData);
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

    return (
        <div className="max-w-xl mx-auto bg-malta-950 text-malta-100 rounded-2xl shadow-lg p-6 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Log Brew</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block text-sm font-medium text-malta-200 mb-1">
                    Coffee Weight (g): {formData.coffeeWeight}
                    <Input
                        type="range"
                        name="coffeeWeight"
                        min={10}
                        max={25}
                        step={0.1}
                        value={formData.coffeeWeight}
                        onChange={handleChange}
                        className="
                        w-full mt-1 appearance-none
                        bg-malta-900
                        h-2 rounded-lg
                        cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:h-4
                        [&::-webkit-slider-thumb]:w-4
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-malta-600
                        [&::-webkit-slider-thumb]:border-2
                        [&::-webkit-slider-thumb]:border-malta-300
                        [&::-webkit-slider-thumb]:transition
                        [&::-webkit-slider-thumb]:duration-200
                        [&::-webkit-slider-thumb]:hover:bg-malta-500
                        focus:outline-none
                      "
                    />
                </label>

                <label className="block text-sm font-medium text-malta-200 mb-1">
                    Brew Time (sec):
                    <Input
                        type="number"
                        name="brewTime"
                        value={formData.brewTime}
                        onChange={handleChange}
                        className="
                        transition-all
                        duration-200
                        focus:ring-2
                        focus:ring-malta-400
                        w-full
                        appearance-none
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                        [moz-appearance:textfield]
                        "
                    />
                </label>

                <label className="block text-sm font-medium text-malta-200 mb-1">
                    Yield Weight (g):
                    <Input
                        type="number"
                        name="yieldWeight"
                        value={formData.yieldWeight.toString()}
                        onChange={handleChange}
                        className="
                        transition-all
                        duration-200
                        focus:ring-2
                        focus:ring-malta-400
                        w-full
                        appearance-none
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                        [moz-appearance:textfield]
                        "
                    />
                </label>

                <label className="block text-sm font-medium text-malta-200 mb-1">
                    Boiler Temperature (C):
                    <Input
                        type="number"
                        name="boilerTemperature"
                        value={formData.boilerTemperature.toString()}
                        onChange={handleChange}
                        className="
                        transition-all
                        duration-200
                        focus:ring-2
                        focus:ring-malta-400
                        w-full
                        appearance-none
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                        [moz-appearance:textfield]
                        "
                    />
                </label>

                <label className="block text-sm font-medium text-malta-200 mb-1">
                    Grind Setting:
                    <Input
                        className="
                        transition-all
                        duration-200
                        focus:ring-2
                        focus:ring-malta-400
                        w-full
                        appearance-none
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                        [moz-appearance:textfield]
                        "
                        type="number"
                        name="grindSetting"
                        value={formData.grindSetting.toString()}
                        onChange={handleChange}
                    />
                </label>

                <label className="block text-sm font-medium text-malta-200 mb-1">
                    Coffee Type:
                </label>
                <Select
                    value={formData.coffeeType?.id ?? ""}
                    onValueChange={(id) => handleCoffeeTypeChange(id)}
                >
                    <SelectTrigger className="w-full bg-malta-950 border-malta-800 text-malta-100">
                        <SelectValue placeholder="Select a coffee"/>
                    </SelectTrigger>
                    <SelectContent className="bg-malta-900 text-malta-100 border-malta-700">
                        {coffeeTypes.map((coffee) => (
                            <SelectItem key={coffee.id} value={coffee.id}>
                                {coffee.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <label className="block text-sm font-medium text-malta-200 mb-1">
                    Notes:
                    <Textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="
                        transition-all
                        duration-200
                        focus:ring-2
                        focus:ring-malta-400
                        w-full
                        appearance-none"
                    />
                </label>

                <Button
                    type="submit"
                    className="w-full bg-malta-700 hover:bg-malta-600 text-white font-medium rounded-md shadow"
                >
                    Save Brew
                </Button>
            </form>
        </div>
    );
};

export default BrewForm;
