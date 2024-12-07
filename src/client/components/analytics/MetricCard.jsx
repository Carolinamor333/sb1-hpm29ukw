import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { Tooltip } from '@headlessui/react';

export default function MetricCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon,
  description,
  trend = [] 
}) {
  const isPositive = changeType === 'increase';
  const showTrend = trend.length > 0;

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <Tooltip>
            <Tooltip.Button className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            </Tooltip.Button>
            <Tooltip.Panel className="bg-gray-900 text-white p-2 rounded text-sm">
              {description}
            </Tooltip.Panel>
          </Tooltip>
        </div>
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
          isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isPositive ? (
            <ArrowUpIcon className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 mr-1" />
          )}
          {change}
        </div>
      </div>
      
      <p className="mt-4 text-3xl font-semibold text-gray-900">{value}</p>
      
      {showTrend && (
        <div className="mt-4 h-10">
          <div className="flex items-end space-x-1 h-full">
            {trend.map((point, index) => (
              <div
                key={index}
                className="w-1 bg-blue-200 rounded-t"
                style={{ 
                  height: `${(point / Math.max(...trend)) * 100}%`,
                  backgroundColor: point === Math.max(...trend) ? '#3B82F6' : '#BFDBFE'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}