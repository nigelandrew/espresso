import {useState} from "react";
import {v4 as uuidv4} from "uuid";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {CoffeeType} from "@/types/coffee.ts";
import {createCoffeeType} from "../../api/CoffeeAPI.ts"

type CoffeeTypeFormProps = {
    onSubmit?: (coffee: CoffeeType) => void;
};

export default function CoffeeTypeForm({onSubmit}: CoffeeTypeFormProps) {
    const [formData, setFormData] = useState<Omit<CoffeeType, "id">>({
        name: "",
        roaster: "",
        originLocation: "",
        elevation: "",
        roastLevel: "medium",
        flavorNotes: "",
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const fullCoffeeType: CoffeeType = {...formData, id: uuidv4()};

        try {
            const saved = await createCoffeeType(fullCoffeeType);
            onSubmit?.(saved);

            setFormData({
                name: "",
                roaster: "",
                originLocation: "",
                elevation: "",
                roastLevel: "medium",
                flavorNotes: "",
            });

            setError(null);
        } catch (err) {
            console.error(err);
            setError("Could not save coffee type. Please try again.");
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-malta-950 text-malta-100 rounded-2xl shadow-lg p-6 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Coffee Type</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                {error && (
                    <p className="text-red-400 text-sm font-medium mb-2">{error}</p>
                )}

                <div>
                    <Label htmlFor="name" className="block text-sm font-medium text-malta-200 mb-1">Coffee Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} className="
                        transition-all
                        duration-200
                        focus:ring-2
                        focus:ring-malta-400
                        w-full
                        appearance-none
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                        [moz-appearance:textfield]
                        "/>
                </div>

                <div>
                    <Label htmlFor="roaster" className="block text-sm font-medium text-malta-200 mb-1">Roaster</Label>
                    <Input id="roaster" name="roaster" value={formData.roaster} onChange={handleChange} className="
                        transition-all
                        duration-200
                        focus:ring-2
                        focus:ring-malta-400
                        w-full
                        appearance-none
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                        [moz-appearance:textfield]
                        "/>
                </div>

                <div>
                    <Label htmlFor="originLocation" className="block text-sm font-medium text-malta-200 mb-1">Origin
                        Location</Label>
                    <Input id="originLocation" name="originLocation" value={formData.originLocation}
                           onChange={handleChange} className="
                        transition-all
                        duration-200
                        focus:ring-2
                        focus:ring-malta-400
                        w-full
                        appearance-none
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                        [moz-appearance:textfield]
                        "/>
                </div>

                <div>
                    <Label htmlFor="elevation"
                           className="block text-sm font-medium text-malta-200 mb-1">Elevation</Label>
                    <Input id="elevation" name="elevation" value={formData.elevation} onChange={handleChange}
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
                        "/>
                </div>

                <div>
                    <Label htmlFor="roastLevel" className="block text-sm font-medium text-malta-200 mb-1">Roast
                        Level</Label>
                    <select
                        id="roastLevel"
                        name="roastLevel"
                        value={formData.roastLevel}
                        onChange={handleChange}
                        className="w-full border rounded p-2
                        transition-all
                        duration-200
                        focus:ring-2
                        focus:ring-malta-400
                        appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none
                    [&::-webkit-inner-spin-button]:appearance-none
                    [moz-appearance:textfield]
                    "
                    >
                        <option value="light">Light</option>
                        <option value="medium">Medium</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>

                <div>
                    <Label htmlFor="flavorNotes" className="block text-sm font-medium text-malta-200 mb-1">Flavor
                        Notes</Label>
                    <Textarea
                        id="flavorNotes"
                        name="flavorNotes"
                        value={formData.flavorNotes}
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
                </div>

                <Button type="submit"
                        className="w-full bg-malta-700 hover:bg-malta-600 text-white font-medium rounded-md shadow">
                    Save Coffee
                </Button>
            </form>
        </div>
    );
};