import { useState } from 'react';
import useOptimizationStore from '../stores/optimizationStore';

export default function OptimizationPanel() {
  const [currentStock, setCurrentStock] = useState('');
  const [forecastDemand, setForecastDemand] = useState('');
  const { optimizationResults, loading, error, fetchOptimization } = useOptimizationStore();

  const handleOptimize = async (e) => {
    e.preventDefault();
    await fetchOptimization({
      currentStock: Number(currentStock),
      forecastDemand: Number(forecastDemand)
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Supply Chain Optimization</h2>
      
      <form onSubmit={handleOptimize} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Stock Level
          </label>
          <input
            type="number"
            value={currentStock}
            onChange={(e) => setCurrentStock(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Forecast Demand
          </label>
          <input
            type="number"
            value={forecastDemand}
            onChange={(e) => setForecastDemand(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? 'Optimizing...' : 'Optimize'}
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-600 text-sm">
          {error}
        </div>
      )}

      {optimizationResults && (
        <div className="mt-6 space-y-4">
          <h3 className="text-md font-medium">Optimization Results</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Optimal Order Quantity</p>
              <p className="text-lg font-semibold">{optimizationResults.quantity}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Reorder Point</p>
              <p className="text-lg font-semibold">{optimizationResults.reorderPoint}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}