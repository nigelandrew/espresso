import {useState, FormEvent, ChangeEvent} from "react";
import {Maintenance} from "@/types/maintenance.ts";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

type MaintenanceFormProps = {
    onSubmitMaintenance: (maintenance: Omit<Maintenance, 'id'>) => void;
};

export default function MaintenanceForm({onSubmitMaintenance}: MaintenanceFormProps) {
    const [formData, setFormData] = useState<Omit<Maintenance, 'id'>>({
        maintenanceDate: new Date().toISOString().slice(0, 10),  // prefill today's date
        maintenanceType: "",
        notes: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmitMaintenance(formData);
        setFormData({
            maintenanceDate: new Date().toISOString().slice(0, 10),
            maintenanceType: "",
            notes: "",
        });
    };

    return (
        <div className="max-w-xl mx-auto bg-malta-950 text-malta-100 rounded-2xl shadow-lg p-6 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Log Maintenance</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <label className="block text-sm font-medium text-malta-200 mb-1">
                    Maintenance Date:
                    <Input
                        type="date"
                        name="maintenanceDate"
                        value={formData.maintenanceDate}
                        onChange={handleChange}
                    />
                </label>

                <label className="block text-sm font-medium text-malta-200 mb-1">
                    Maintenance Type:
                </label>
                <Select
                    value={formData.maintenanceType}
                    onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, maintenanceType: value }))
                    }
                >
                    <SelectTrigger className="w-full bg-malta-950 border-malta-800 text-malta-100">
                        <SelectValue placeholder="Select maintenance type" />
                    </SelectTrigger>
                    <SelectContent className="bg-malta-900 text-malta-100 border-malta-700">
                        <SelectItem value="descale">Descale</SelectItem>
                        <SelectItem value="backflush">Backflush</SelectItem>
                        <SelectItem value="grouphead-clean">Grouphead Clean</SelectItem>
                        <SelectItem value="gasket-replace">Gasket Replacement</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>


                <label className="block text-sm font-medium text-malta-200 mb-1">
                    Notes:
                    <Textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                    />
                </label>

                <Button
                    type="submit"
                    className="w-full bg-malta-700 hover:bg-malta-600 text-white font-medium rounded-md shadow"
                >
                    Save Maintenance
                </Button>

            </form>
        </div>
    );
}
