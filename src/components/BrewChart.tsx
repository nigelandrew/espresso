import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
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

    const brewsByCoffeeTypeMap: Record<string, number> = {};
    brews.forEach((brew) => {
        const coffeeName = brew.coffeeType?.name || "Unknown";
        brewsByCoffeeTypeMap[coffeeName] = (brewsByCoffeeTypeMap[coffeeName] || 0) + 1;
    });

    const brewsByCoffeeTypeData = Object.entries(brewsByCoffeeTypeMap).map(([name, count]) => ({
        name,
        count,
    }));

    const pieColors = ["#7a6054", "#5a4036", "#927564", "#af9b88", "#bcac9a", "#ddd5cb"];

    return (
        <div className="mt-8">
            {/* Brew Ratio Over Time */}
            <h2 className="text-xl font-semibold mt-8 mb-4 text-malta-100">Brew Ratio Over Time</h2>
            <div className="h-64 bg-malta-950 p-4 rounded-xl shadow-md">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ratioData}>
                        <CartesianGrid stroke="#3c2a24" strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" stroke="#ddd5cb" />
                        <YAxis domain={[1.0, 3.0]} tickFormatter={(val) => val.toFixed(1)} stroke="#ddd5cb" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#4b352d', border: 'none' }}
                            labelStyle={{ color: '#ddd5cb' }}
                            itemStyle={{ color: '#f8f6f4' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="ratio"
                            stroke="#927564"
                            strokeWidth={2}
                            dot={{ stroke: '#af9b88', strokeWidth: 2, fill: '#927564' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Brews per Day */}
            <h2 className="text-xl font-semibold mb-4 mt-8 text-malta-100">Brews per Day</h2>
            <div className="h-64 bg-malta-950 p-4 rounded-xl shadow-md">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={brewsPerDayData}>
                        <CartesianGrid stroke="#3c2a24" strokeDasharray="3 3" />
                        <XAxis dataKey="date" stroke="#ddd5cb" />
                        <YAxis allowDecimals={false} stroke="#ddd5cb" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#4b352d', border: 'none' }}
                            labelStyle={{ color: '#ddd5cb' }}
                            itemStyle={{ color: '#f8f6f4' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#7a6054"
                            strokeWidth={2}
                            dot={{ stroke: '#af9b88', strokeWidth: 2, fill: '#7a6054' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* New: Brews by Coffee Type Pie Chart */}
            <h2 className="text-xl font-semibold mb-4 mt-8 text-malta-100">Brews by Coffee Type</h2>
            <div className="h-80 bg-malta-950 p-4 rounded-xl shadow-md">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={brewsByCoffeeTypeData}
                            dataKey="count"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            innerRadius={50}
                            paddingAngle={3}
                            fill="#7a6054"
                        >
                            {brewsByCoffeeTypeData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#4b352d', border: 'none' }}
                            labelStyle={{ color: '#ddd5cb' }}
                            itemStyle={{ color: '#f8f6f4' }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            iconType="circle"
                            wrapperStyle={{ color: '#ddd5cb', fontSize: '12px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
