import { ExclamationTriangleIcon, ClockIcon } from '@heroicons/react/24/outline';

const bottlenecks = [
  {
    id: 1,
    type: 'delay',
    title: 'Shipping Delays',
    description: 'Average 2.5 days delay in West Coast region',
    impact: 'High',
    affectedOrders: 15
  },
  {
    id: 2,
    type: 'inventory',
    title: 'Low Stock Alert',
    description: 'Product A inventory below safety stock',
    impact: 'Medium',
    timeToStockout: '3 days'
  },
  {
    id: 3,
    type: 'cost',
    title: 'High Shipping Costs',
    description: 'International shipping rates increased by 15%',
    impact: 'Medium',
    additionalCost: '$2,500'
  }
];

export default function BottlenecksPanel() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Supply Chain Bottlenecks</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {bottlenecks.map((bottleneck) => (
            <div
              key={bottleneck.id}
              className="p-4 rounded-lg border border-red-200 bg-red-50"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">{bottleneck.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{bottleneck.description}</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      bottleneck.impact === 'High' 
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {bottleneck.impact} Impact
                    </span>
                    {bottleneck.affectedOrders && (
                      <span className="text-sm text-gray-500">
                        {bottleneck.affectedOrders} orders affected
                      </span>
                    )}
                    {bottleneck.timeToStockout && (
                      <span className="text-sm text-gray-500">
                        Stockout in {bottleneck.timeToStockout}
                      </span>
                    )}
                    {bottleneck.additionalCost && (
                      <span className="text-sm text-gray-500">
                        Extra cost: {bottleneck.additionalCost}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}