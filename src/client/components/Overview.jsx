import { 
  ShoppingCartIcon,
  TruckIcon,
  CubeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import MetricsCard from './overview/MetricsCard';
import DemandChart from './overview/DemandChart';
import ActivityFeed from './overview/ActivityFeed';

const metrics = [
  {
    title: 'Total Orders',
    value: '2,345',
    change: '+12.3%',
    changeType: 'increase',
    icon: ShoppingCartIcon
  },
  {
    title: 'Fulfillment Rate',
    value: '94.5%',
    change: '+2.4%',
    changeType: 'increase',
    icon: TruckIcon
  },
  {
    title: 'Low Stock Items',
    value: '12',
    change: '-3',
    changeType: 'decrease',
    icon: CubeIcon
  },
  {
    title: 'Delayed Shipments',
    value: '3',
    change: '+1',
    changeType: 'increase',
    icon: ClockIcon
  }
];

export default function Overview() {
  return (
    <div>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Supply Chain Overview</h1>
            <p className="mt-1 text-sm text-gray-500">
              Monitor your supply chain performance, key metrics, and recent updates in real-time
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            Create New Order
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {metrics.map((metric) => (
          <MetricsCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Charts and Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DemandChart />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}