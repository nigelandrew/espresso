import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type Brew = {
    coffeeWeight: number
    brewTime: number
    yieldWeight: number
    notes: string
    timestamp: string
}

type Props = {
    brews: Brew[]
}

export default function BrewTable({ brews }: Props) {
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
                        <TableHead>Notes</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedBrews.map((brew, i) => (
                        <TableRow key={i}>
                            <TableCell>{new Date(brew.timestamp).toLocaleDateString()}</TableCell>
                            <TableCell>{brew.coffeeWeight}</TableCell>
                            <TableCell>{brew.yieldWeight}</TableCell>
                            <TableCell>{brew.brewTime}</TableCell>
                            <TableCell>{brew.notes || "—"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
