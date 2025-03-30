import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Brew } from "@/types/brew";

type Props = {
    brews: Brew[];
    onDelete: (timestamp: string) => void;
}

export default function BrewTable({ brews, onDelete }: Props) {
    const sortedBrews = [...brews].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Brew History</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Coffee (g)</TableHead>
                        <TableHead>Yield (g)</TableHead>
                        <TableHead>Time (s)</TableHead>
                        <TableHead>Boiler Temperature (C)</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedBrews.map((brew, i) => (
                        <TableRow key={i}>
                            <TableCell>{new Date(brew.timestamp).toLocaleDateString()}</TableCell>
                            <TableCell>{brew.coffeeWeight}</TableCell>
                            <TableCell>{brew.yieldWeight}</TableCell>
                            <TableCell>{brew.brewTime}</TableCell>
                            <TableCell>{brew.boilerTemperature}</TableCell>
                            <TableCell>{brew.notes || "—"}</TableCell>
                            <TableCell className="text-right">
                                <button
                                    type="button"
                                    onClick={() => onDelete(brew.timestamp)}
                                    className="text-red-500 hover:underline text-sm"
                                >
                                    Delete
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
