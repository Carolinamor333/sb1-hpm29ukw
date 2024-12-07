import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

export default function MetricCard({ name, value, change, changeType, icon: Icon, alert }) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${alert ? 'border-l-4 border-red-500' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg ${alert ? 'bg-red-100' : 'bg-blue-100'}`}>
            <Icon className={`h-6 w-6 ${alert ? 'text-red-600' : 'text-blue-600'}`} />
          </div>
          <h3 className="ml-3 text-sm font-medium text-gray-900">{name}</h3>
        </div>
        <div className={`inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium ${
          changeType === 'increase' 
            ? alert ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {changeType === 'increase' ? (
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