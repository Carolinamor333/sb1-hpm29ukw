import { 
  ShoppingCartIcon, 
  TruckIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

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

export default function PerformanceMetrics({ timeRange, category }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
      {metrics.map((metric) => (
        <div 
          key={metric.id} 
          className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 bg-gray-50 rounded-xl">
              <metric.icon className="h-6 w-6 text-gray-700" />
            </div>
            <div className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
              metric.changeType === 'increase' 
                ? metric.name === 'Defect Rate' || metric.name === 'Supply Chain Costs'
                  ? 'bg-red-50 text-red-700'
                  : 'bg-green-50 text-green-700'
                : metric.name === 'Defect Rate' || metric.name === 'Supply Chain Costs'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
            }`}>
              {metric.changeType === 'increase' ? (
                <ArrowUpIcon className="h-3 w-3 mr-1.5" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 mr-1.5" />
              )}
              {metric.change}
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
            <h3 className="mt-1 text-sm font-medium text-gray-500">{metric.name}</h3>
          </div>
          
          <p className="mt-4 text-xs text-gray-500">{metric.description}</p>
        </div>
      ))}
    </div>
  );
}