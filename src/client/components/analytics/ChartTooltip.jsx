export default function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <p className="text-sm font-medium text-gray-900">{label}</p>
      {payload.map((item, index) => (
        <div key={index} className="flex items-center mt-2">
          <div 
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: item.color }}
          />
          <p className="text-sm text-gray-600">
            {item.name}: {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}