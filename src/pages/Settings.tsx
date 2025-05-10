import {Input} from "@/components/ui/input.tsx";

export default function Settings() {

    return (
        <div className="max-w-xl mx-auto bg-malta-950 text-malta-100 rounded-2xl shadow-lg p-6 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            <label className="block text-sm font-medium text-malta-200 mb-1">
                Name:
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
                    name="name"
                />
            </label>

            <label className="block text-sm font-medium text-malta-200 mb-1">
                Email:
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
                    name="email"
                />
            </label>
        </div>
    )
}