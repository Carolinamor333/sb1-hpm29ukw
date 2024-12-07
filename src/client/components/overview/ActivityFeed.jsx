import { 
  TruckIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const activities = [
  {
    id: 1,
    type: 'shipped',
    message: 'Order #12345 shipped to Warehouse A',
    timestamp: '2:30 PM',
    icon: TruckIcon,
    iconBackground: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 2,
    type: 'delayed',
    message: 'Shipment #5678 delayed by 2 days',
    timestamp: '1:45 PM',
    icon: ExclamationTriangleIcon,
    iconBackground: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    id: 3,
    type: 'delivered',
    message: 'Order #9012 delivered successfully',
    timestamp: '11:30 AM',
    icon: CheckCircleIcon,
    iconBackground: 'bg-green-100',
    iconColor: 'text-green-600'
  }
];

export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>
      <div className="p-6">
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, activityIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== activities.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className={`h-8 w-8 rounded-full ${activity.iconBackground} flex items-center justify-center ring-8 ring-white`}>
                        <activity.icon className={`h-5 w-5 ${activity.iconColor}`} aria-hidden="true" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">{activity.message}</p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        {activity.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}