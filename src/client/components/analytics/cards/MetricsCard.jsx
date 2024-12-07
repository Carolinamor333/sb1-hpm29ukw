import { formatCurrency } from '../../../utils/formatters';

const metrics = [
  { id: 'revenue', label: 'Revenue' },
  { id: 'orders', label: 'Orders' },
  { id: 'efficiency', label: 'Efficiency' }
];

export default function MetricsCard({ value, change, metric, onMetricChange }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <div className="space-x-4">
          {metrics.map((m) => (
            <button
              key={m.id}
              onClick={() => onMetricChange(m.id)}
              className={`text-sm font-medium ${
                metric === m.id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="text-2xl font-semibold text-gray-900">
          {formatCurrency(value)}
        </div>
      </div>
      
      <div className="mt-2 flex items-baseline">
        <span className="text-2xl font-bold text-green-600">+{change}%</span>
        <span className="ml-2 text-sm text-gray-500">from previous period</span>
      </div>
    </div>
  );
}