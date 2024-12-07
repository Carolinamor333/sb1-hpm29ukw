import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

export default function MetricsCard({ title, value, change, changeType, icon: Icon }) {
  const isPositive = changeType === 'increase';
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="ml-3 text-sm font-medium text-gray-900">{title}</h3>
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
    </div>
  );
}