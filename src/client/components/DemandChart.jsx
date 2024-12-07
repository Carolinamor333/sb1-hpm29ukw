import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', actual: 4000, forecast: 4400 },
  { month: 'Feb', actual: 3000, forecast: 3200 },
  { month: 'Mar', actual: 2000, forecast: 2400 },
  { month: 'Apr', actual: 2780, forecast: 2900 },
  { month: 'May', actual: 1890, forecast: 2100 },
  { month: 'Jun', actual: 2390, forecast: 2500 },
];

export default function DemandChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="actual" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="forecast" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}