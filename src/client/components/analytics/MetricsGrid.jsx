import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { 
  TruckIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  ShoppingCartIcon 
} from '@heroicons/react/24/outline';

const metrics = [
  {
    id: 1,
    name: 'Total Orders',
    value: '4,832',
    change: '+8.2%',
    changeType: 'increase',
    icon: ShoppingCartIcon,
    description: 'Total orders processed this period'
  },
  {
    id: 2,
    name: 'On-Time Delivery',
    value: '94.5%',
    change: '+2.4%',
    changeType: 'increase',
    icon: TruckIcon,
    description: 'Orders delivered on schedule'
  },
  {
    id: 3,
    name: 'Avg. Fulfillment Time',
    value: '2.3 days',
    change: '-0.5 days',
    changeType: 'decrease',
    icon: ClockIcon,
    description: 'Average time from order to delivery'
  },
  {
    id: 4,
    name: 'Supply Chain Costs',
    value: '$283.5K',
    change: '+5.1%',
    changeType: 'increase',
    icon: CurrencyDollarIcon,
    description: 'Total operational costs'
  },
  {
    id: 5,
    name: 'Defect Rate',
    value: '0.8%',
    change: '-0.3%',
    changeType: 'decrease',
    icon: ExclamationTriangleIcon,
    description: 'Products reported defective'
  }
];

export default function MetricsGrid({ timeRange, category }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {metrics.map((metric) => (
        <div key={metric.id} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <metric.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="ml-3 text-sm font-medium text-gray-900">{metric.name}</h3>
            </div>
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
              metric.changeType === 'increase' 
                ? metric.name === 'Defect Rate' 
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
                : metric.name === 'Defect Rate'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
            }`}>
              {metric.changeType === 'increase' ? (
                <ArrowUpIcon className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 mr-1" />
              )}
              {metric.change}
            </div>
          </div>
          <p className="mt-4 text-3xl font-semibold text-gray-900">{metric.value}</p>
          <p className="mt-1 text-sm text-gray-500">{metric.description}</p>
        </div>
      ))}
    </div>
  );
}