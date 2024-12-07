import { LightBulbIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const recommendations = [
  {
    id: 1,
    type: 'optimization',
    title: 'Optimize Inventory',
    description: 'Consider increasing safety stock for Product A due to seasonal demand',
    impact: 'Medium',
    icon: LightBulbIcon
  },
  {
    id: 2,
    type: 'alert',
    title: 'Potential Delay Risk',
    description: 'Supplier Z showing signs of delayed deliveries. Consider backup options.',
    impact: 'High',
    icon: ExclamationTriangleIcon
  }
];

export default function RecommendationsPanel() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">AI Recommendations</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className={`p-4 rounded-lg ${
                rec.type === 'alert' ? 'bg-red-50' : 'bg-blue-50'
              }`}
            >
              <div className="flex items-start">
                <div className={`p-2 rounded-lg ${
                  rec.type === 'alert' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  <rec.icon className={`h-5 w-5 ${
                    rec.type === 'alert' ? 'text-red-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">{rec.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{rec.description}</p>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      rec.impact === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {rec.impact} Impact
                    </span>
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