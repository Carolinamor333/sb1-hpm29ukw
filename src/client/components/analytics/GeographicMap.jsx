import { MapIcon } from '@heroicons/react/24/outline';

// In a real application, you would use a mapping library like react-simple-maps
// This is a simplified version for demonstration
export default function GeographicMap() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Geographic Performance</h2>
      </div>
      <div className="p-6">
        <div className="text-center py-12">
          <MapIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">
            Interactive map visualization would go here
          </p>
          <p className="text-xs text-gray-400">
            Using react-simple-maps or similar library
          </p>
        </div>
        
        {/* Region Statistics */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {[
            { region: 'North America', orders: 2345, performance: 'good' },
            { region: 'Europe', orders: 1892, performance: 'good' },
            { region: 'Asia Pacific', orders: 1456, performance: 'warning' },
            { region: 'Latin America', orders: 892, performance: 'good' }
          ].map((region) => (
            <div
              key={region.region}
              className="p-4 rounded-lg border border-gray-200"
            >
              <h3 className="text-sm font-medium text-gray-900">{region.region}</h3>
              <p className="mt-1 text-sm text-gray-500">Orders: {region.orders}</p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                region.performance === 'good' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {region.performance === 'good' ? 'On Track' : 'Needs Attention'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}