import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { date: '2024-01-01', actual: 4000, forecast: 4400 },
  { date: '2024-01-02', actual: 3000, forecast: 3200 },
  { date: '2024-01-03', actual: 2000, forecast: 2400 },
  { date: '2024-01-04', actual: 2780, forecast: 2900 },
  { date: '2024-01-05', actual: 1890, forecast: 2100 },
  { date: '2024-01-06', actual: 2390, forecast: 2500 },
  { date: '2024-01-07', actual: 3490, forecast: 3200 },
];

export default function DemandChart() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Demand vs Forecast</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="actual" stroke="#4F46E5" name="Actual Demand" />
            <Line type="monotone" dataKey="forecast" stroke="#10B981" name="Forecast" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}