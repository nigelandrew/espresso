import {Roaster} from "@/types/roaster.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useState, FormEvent, ChangeEvent} from "react";
import {Button} from "@/components/ui/button.tsx";

type RoasterFormProps = {
    onSubmit: (roaster: Omit<Roaster, 'id'>) => void;
}

export default function RoasterForm({onSubmit}: RoasterFormProps) {

    const [formData, setFormData] = useState<Omit<Roaster, "id">>({
        roasterName: "",
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({
            roasterName: "",
        });
    };

    return (
        <div className="max-w-xl mx-auto bg-malta-950 text-malta-100 rounded-2xl shadow-lg p-6 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Roaster</h2>
            <form onSubmit={handleSubmit} className="w-full">
        <Label className="block text-sm font-medium text-malta-200 mb-1" htmlFor="roasterName">Roaster Name</Label>
    <Input
        id="roasterName"
        name="roasterName"
        value={formData.roasterName}
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

    <Button
        type="submit"
        className="w-full mt-4 bg-malta-700 hover:bg-malta-600 text-white font-medium rounded-md shadow"
    >
        Save Roaster
    </Button>
            </form>
        </div>
    )
};