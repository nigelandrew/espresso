import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx"
import {CoffeeType} from "@/types/coffee.ts"

type Props = {
    coffees: CoffeeType[];
};

export default function CoffeeTable({coffees}: Props) {
    return(
        <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Coffee Name</TableHead>
                <TableHead>Roaster ID</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Roast Level</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {coffees.map((coffee) => (
                <TableRow key={coffee.id}>
                    <TableCell>{coffee.name}</TableCell>
                    <TableCell>{coffee.roasterId}</TableCell>
                    <TableCell>{coffee.originLocation}</TableCell>
                    <TableCell className="capitalize">{coffee.roastLevel}</TableCell>
                </TableRow>
            ))}
        </TableBody>
        </Table>
    )
};