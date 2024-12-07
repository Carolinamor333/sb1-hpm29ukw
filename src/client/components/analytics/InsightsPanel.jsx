import { LightBulbIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const insights = [
  {
    id: 1,
    type: 'prediction',
    title: 'Stock Level Alert',
    description: 'Product A inventory predicted to fall below safety levels in 3 days',
    action: 'Review and Reorder',
    priority: 'high'
  },
  {
    id: 2,
    type: 'optimization',
    title: 'Cost Saving Opportunity',
    description: 'Switch to Supplier X for 15% cost savings on Product Y',
    action: 'Compare Suppliers',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'trend',
    title: 'Seasonal Trend Detected',
    description: 'Order volume increasing 25% month-over-month',
    action: 'Adjust Forecast',
    priority: 'low'
  }
];

export default function InsightsPanel() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">AI Insights</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`p-4 rounded-lg ${
                insight.type === 'prediction' 
                  ? 'bg-blue-50'
                  : insight.type === 'optimization'
                    ? 'bg-green-50'
                    : 'bg-yellow-50'
              }`}
            >
              <div className="flex items-start">
                <div className={`p-2 rounded-lg ${
                  insight.type === 'prediction'
                    ? 'bg-blue-100'
                    : insight.type === 'optimization'
                      ? 'bg-green-100'
                      : 'bg-yellow-100'
                }`}>
                  {insight.type === 'prediction' ? (
                    <LightBulbIcon className="h-5 w-5 text-blue-600" />
                  ) : insight.type === 'optimization' ? (
                    <ArrowTrendingUpIcon className="h-5 w-5 text-green-600" />
                  ) : (
                    <LightBulbIcon className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">{insight.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{insight.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      insight.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : insight.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                    }`}>
                      {insight.priority.charAt(0).toUpperCase() + insight.priority.slice(1)} Priority
                    </span>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      {insight.action}
                    </button>
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