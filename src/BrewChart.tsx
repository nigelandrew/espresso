import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Brew = {
    coffeeWeight: number;
    brewTime: number;
    yieldWeight: number;
    notes: string;
    timestamp: string;
};

type Props = {
    brews: Brew[];
};

export default function BrewChart({ brews }: Props) {
    const sortedBrews = [...brews].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Yield Weight Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sortedBrews}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="timestamp"
                        tickFormatter={(t) => new Date(t).toLocaleDateString()}
                    />
                    <YAxis label={{ value: 'Yield (g)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip
                        labelFormatter={(label) => new Date(label).toLocaleString()}
                    />
                    <Line type="monotone" dataKey="yieldWeight" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
