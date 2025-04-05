import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brew } from "@/types/brew";

type Props = {
    brews: Brew[];
};

export default function BrewChart({ brews }: Props) {
    const ratioData = brews.map((brew) => ({
        timestamp: new Date(brew.timestamp).toLocaleDateString(),
        ratio: +(brew.yieldWeight / brew.coffeeWeight).toFixed(2),
    }));

    const brewsPerDayMap: Record<string, number> = {};

    brews.forEach((brew) => {
        const date = new Date(brew.timestamp).toLocaleDateString();
        brewsPerDayMap[date] = (brewsPerDayMap[date] || 0) + 1;
    });

    const brewsPerDayData = Object.entries(brewsPerDayMap).map(([date, count]) => ({
        date,
        count,
    }));


    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mt-8 mb-4">Brew Ratio Over Time</h2>
            <div className="h-64 bg-zinc-900 p-4 rounded-xl shadow-md">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ratioData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" />
                        <YAxis domain={[1.0, 3.0]} tickFormatter={(val) => val.toFixed(1)} />
                        <Tooltip />
                        <Line type="monotone" dataKey="ratio" stroke="#82ca9d" strokeWidth={2} dot />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <h2 className="text-4xl font-semibold mb-4 mt-4">Brews per Day</h2>
            <div className="h-64 bg-zinc-900 p-4 rounded-xl shadow-md">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={brewsPerDayData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#38bdf8"
                            strokeWidth={2}
                            dot
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
