import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuidv4 } from "uuid";
import { CoffeeType } from "@/types/coffee";

type CoffeeTypeFormProps = {
    onSubmit: (coffee: CoffeeType) => void;
};

export default function CoffeeTypeForm({ onSubmit }: CoffeeTypeFormProps) {
    const [formData, setFormData] = useState<Omit<CoffeeType, "id">>({
        name: "",
        roaster: "",
        originLocation: "",
        elevation: "",
        roastLevel: "medium",
        flavorNotes: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...formData, id: uuidv4() });
        setFormData({
            name: "",
            roaster: "",
            originLocation: "",
            elevation: "",
            roastLevel: "medium",
            flavorNotes: "",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div>
                <Label htmlFor="name">Coffee Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>

            <div>
                <Label htmlFor="roaster">Roaster</Label>
                <Input id="roaster" name="roaster" value={formData.roaster} onChange={handleChange} />
            </div>

            <div>
                <Label htmlFor="originLocation">Origin Location</Label>
                <Input id="originLocation" name="originLocation" value={formData.originLocation} onChange={handleChange} />
            </div>

            <div>
                <Label htmlFor="elevation">Elevation</Label>
                <Input id="elevation" name="elevation" value={formData.elevation} onChange={handleChange} />
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
    );
}
