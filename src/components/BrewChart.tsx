import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {Brew} from "@/types/brew.ts";

type Props = {
    brews: Brew[];
};

export default function BrewChart({brews}: Props) {
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
            <h2 className="text-xl font-semibold mt-8 mb-4 text-malta-100">Brew Ratio Over Time</h2>
            <div className="h-64 bg-malta-950 p-4 rounded-xl shadow-md">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ratioData}>
                        <CartesianGrid stroke="#3c2a24" strokeDasharray="3 3"/>
                        <XAxis dataKey="timestamp" stroke="#ddd5cb"/>
                        <YAxis domain={[1.0, 3.0]} tickFormatter={(val) => val.toFixed(1)} stroke="#ddd5cb"/>
                        <Tooltip
                            contentStyle={{backgroundColor: '#4b352d', border: 'none'}}
                            labelStyle={{color: '#ddd5cb'}}
                            itemStyle={{color: '#f8f6f4'}}
                        />
                        <Line
                            type="monotone"
                            dataKey="ratio"
                            stroke="#927564"
                            strokeWidth={2}
                            dot={{stroke: '#af9b88', strokeWidth: 2, fill: '#927564'}}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <h2 className="text-4xl font-semibold mb-4 mt-4 text-malta-100">Brews per Day</h2>
            <div className="h-64 bg-malta-950 p-4 rounded-xl shadow-md">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={brewsPerDayData}>
                        <CartesianGrid stroke="#3c2a24" strokeDasharray="3 3"/>
                        <XAxis dataKey="date" stroke="#ddd5cb"/>
                        <YAxis allowDecimals={false} stroke="#ddd5cb"/>
                        <Tooltip
                            contentStyle={{backgroundColor: '#4b352d', border: 'none'}}
                            labelStyle={{color: '#ddd5cb'}}
                            itemStyle={{color: '#f8f6f4'}}
                        />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#7a6054"
                            strokeWidth={2}
                            dot={{stroke: '#af9b88', strokeWidth: 2, fill: '#7a6054'}}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
