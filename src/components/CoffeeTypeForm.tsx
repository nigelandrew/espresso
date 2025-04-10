import React, {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {v4 as uuidv4} from "uuid";
import {CoffeeType} from "@/types/coffee.ts";

type CoffeeTypeFormProps = {
    onSubmit: (coffee: CoffeeType) => void;
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const fullCoffeeType = {...formData, id: uuidv4()};
        onSubmit(fullCoffeeType);

        try {
            const res = await fetch("http://localhost:4000/coffee-types", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(fullCoffeeType),
            });

            if (!res.ok) throw new Error();

            // Reset form
            setFormData({
                name: "",
                roaster: "",
                originLocation: "",
                elevation: "",
                roastLevel: "medium",
                flavorNotes: "",
            });
        } catch {
            console.log("Error! Cannot post coffee type from CoffeeTypeForm.tsx");
        }
    };


    return (
        <div className="max-w-xl mx-auto bg-malta-950 text-malta-100 rounded-2xl shadow-lg p-6 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Coffee Type</h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                <div>
                    <Label htmlFor="name">Coffee Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange}/>
                </div>

                <div>
                    <Label htmlFor="roaster">Roaster</Label>
                    <Input id="roaster" name="roaster" value={formData.roaster} onChange={handleChange}/>
                </div>

                <div>
                    <Label htmlFor="originLocation">Origin Location</Label>
                    <Input id="originLocation" name="originLocation" value={formData.originLocation}
                           onChange={handleChange}/>
                </div>

                <div>
                    <Label htmlFor="elevation">Elevation</Label>
                    <Input id="elevation" name="elevation" value={formData.elevation} onChange={handleChange}/>
                </div>

                <div>
                    <Label htmlFor="roastLevel">Roast Level</Label>
                    <select
                        id="roastLevel"
                        name="roastLevel"
                        value={formData.roastLevel}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="light">Light</option>
                        <option value="medium">Medium</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>

                <div>
                    <Label htmlFor="flavorNotes">Flavor Notes</Label>
                    <Textarea
                        id="flavorNotes"
                        name="flavorNotes"
                        value={formData.flavorNotes}
                        onChange={handleChange}
                    />
                </div>

                <Button type="submit">Save Coffee</Button>
            </form>
        </div>
    );
}
