import {useEffect, useState} from "react";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { CoffeeType } from "@/types/coffee.ts";
import { RoastLevel } from "@/types/roast-level.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Roaster} from "@/types/roaster.ts";
import { createCoffeeType } from "../../api/CoffeeAPI.ts";
import { RoastLevelSelector } from "@/components/RoastLevelSelector.tsx";
import { toast } from "sonner";
import CoffeeTable from "@/components/CoffeeTable.tsx";

type CoffeeTypeFormProps = {
    onSubmit?: (coffee: CoffeeType) => void;
};

export default function CoffeeTypeForm({ onSubmit }: CoffeeTypeFormProps) {
    const [roasters, setRoasters] = useState<Roaster[]>([]);

    useEffect(() => {
        fetch("http://localhost:4000/roasters")
            .then((res) => res.json())
            .then((data) => {
                console.log("Roasters loaded:", data);
                setRoasters(data);
            })
            .catch((err) => console.error("Failed to fetch roasters:", err));
    }, []);

    const [formData, setFormData] = useState<Omit<CoffeeType, "id">>({
        name: "",
        roasterId: "",
        originLocation: "",
        elevation: "",
        roastLevel: "medium",
        flavorNotes: "",
    });

    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Record<string, string> = {};

        if (!(formData.name ?? "").trim()) newErrors.name = "Coffee name is required.";
        if (!(formData.roasterId ?? "").trim()) newErrors.roaster = "Roaster is required.";
        if (!(formData.originLocation ?? "").trim()) newErrors.originLocation = "Origin location is required.";
        if (!(formData.elevation ?? "").trim()) newErrors.elevation = "Elevation is required.";
        if (!(formData.roastLevel ?? "").trim()) newErrors.roastLevel = "Roast level is required.";
        if (!(formData.flavorNotes ?? "").trim()) newErrors.flavorNotes = "Flavor notes are required.";

        if (Object.keys(newErrors).length > 0) {
            setFieldErrors(newErrors);
            toast.error("Please fill in all required fields.");
            return;
        }

        setFieldErrors({});


        const fullCoffeeType: CoffeeType = { ...formData, id: uuidv4() };
        console.log("Submitting formData:", formData);

        try {
            const saved = await createCoffeeType(fullCoffeeType);
            onSubmit?.(saved);

            toast.success(`${formData.name} added successfully.`);

            setFormData({
                name: "",
                roasterId: "",
                originLocation: "",
                elevation: "",
                roastLevel: "medium",
                flavorNotes: "",
            });
        } catch (err) {
            console.error(err);
            toast.error("Could not save coffee type. Please try again.");
        }
    };

    return (
        <div>
        <div className="max-w-xl mx-auto bg-malta-950 text-malta-100 rounded-2xl shadow-lg p-6 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Coffee Type</h2>
            <form onSubmit={handleSubmit} className="space-y-4 mx-auto">
                <div>
                    <Label htmlFor="name">Coffee Name</Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`
              w-full transition-all duration-200 appearance-none
              ${fieldErrors.name ? "border border-red-400 ring-2 ring-red-500" : "focus:ring-2 focus:ring-malta-400"}
            `}
                    />
                    {fieldErrors.name && <p className="text-red-400 text-sm mt-1">{fieldErrors.name}</p>}
                </div>

                <div>
                    <Label htmlFor="roaster">Roaster</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, roasterId: value }))}>
                        <SelectTrigger className="w-full bg-malta-700 hover:bg-malta-600 text-white font-medium rounded-md shadow">
                            <SelectValue placeholder="Select a roaster" />
                        </SelectTrigger>
                        <SelectContent className="bg-malta-900 text-malta-100 border-malta-700">
                            {roasters.map(roaster => (
                                <SelectItem key={roaster.id} value={roaster.id}>{roaster.roasterName}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {fieldErrors.roaster && <p className="text-red-400 text-sm mt-1">{fieldErrors.roaster}</p>}
                </div>

                <div>
                    <Label htmlFor="originLocation">Origin Location</Label>
                    <Input
                        id="originLocation"
                        name="originLocation"
                        value={formData.originLocation}
                        onChange={handleChange}
                        className={`
              w-full transition-all duration-200 appearance-none
              ${fieldErrors.originLocation ? "border border-red-400 ring-2 ring-red-500" : "focus:ring-2 focus:ring-malta-400"}
            `}
                    />
                    {fieldErrors.originLocation && <p className="text-red-400 text-sm mt-1">{fieldErrors.originLocation}</p>}
                </div>

                <div>
                    <Label htmlFor="elevation">Elevation</Label>
                    <Input
                        id="elevation"
                        name="elevation"
                        value={formData.elevation}
                        onChange={handleChange}
                        className={`
              w-full transition-all duration-200 appearance-none
              ${fieldErrors.elevation ? "border border-red-400 ring-2 ring-red-500" : "focus:ring-2 focus:ring-malta-400"}
            `}
                    />
                    {fieldErrors.elevation && <p className="text-red-400 text-sm mt-1">{fieldErrors.elevation}</p>}
                </div>

                <div>
                    <Label htmlFor="roastLevel">Roast Level</Label>
                    <RoastLevelSelector
                        value={formData.roastLevel as RoastLevel}
                        onChange={(val) =>
                            setFormData((prev) => ({ ...prev, roastLevel: val }))
                        }
                    />
                    {fieldErrors.roastLevel && <p className="text-red-400 text-sm mt-1">{fieldErrors.roastLevel}</p>}
                </div>

                <div>
                    <Label htmlFor="flavorNotes">Flavor Notes</Label>
                    <Textarea
                        id="flavorNotes"
                        name="flavorNotes"
                        value={formData.flavorNotes}
                        onChange={handleChange}
                        className={`
              w-full transition-all duration-200 appearance-none
              ${fieldErrors.flavorNotes ? "border border-red-400 ring-2 ring-red-500" : "focus:ring-2 focus:ring-malta-400"}
            `}
                    />
                    {fieldErrors.flavorNotes && <p className="text-red-400 text-sm mt-1">{fieldErrors.flavorNotes}</p>}
                </div>

                <Button
                    type="submit"
                    className="w-full bg-malta-700 hover:bg-malta-600 text-white font-medium rounded-md shadow"
                >
                    Save Coffee
                </Button>
            </form>
        </div>
            <CoffeeTable coffees={}></CoffeeTable>
        </div>
    );
}
