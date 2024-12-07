const metrics = [
  { label: 'Orders Placed', value: 64, color: 'bg-blue-600' },
  { label: 'In Transit', value: 12, color: 'bg-yellow-500' },
  { label: 'Delivered', value: 10, color: 'bg-green-500' }
];

export default function ProposalProgress() {
  const maxValue = Math.max(...metrics.map(m => m.value));
  
  return (
    <div className="space-y-6">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">{metric.label}</span>
            <span className="text-sm font-medium text-gray-900">{metric.value}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${metric.color} rounded-full transition-all duration-500`}
              style={{ width: `${(metric.value / maxValue) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}