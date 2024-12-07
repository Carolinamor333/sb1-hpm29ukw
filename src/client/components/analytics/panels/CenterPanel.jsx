import { useState } from 'react';
import MetricsCard from '../cards/MetricsCard';
import PerformanceChart from '../cards/PerformanceChart';
import ProposalProgress from '../cards/ProposalProgress';

export default function CenterPanel({ timeRange, setTimeRange }) {
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  return (
    <div className="space-y-8">
      {/* Main Metrics Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Supply Chain Metrics</h2>
            <p className="text-sm text-gray-500">Track changes in key metrics over time</p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>

        <MetricsCard
          value={2567}
          change={20}
          metric={selectedMetric}
          onMetricChange={setSelectedMetric}
        />
        
        <div className="mt-6">
          <PerformanceChart timeRange={timeRange} metric={selectedMetric} />
        </div>
      </div>

      {/* Progress Tracking */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Progress</h2>
        <ProposalProgress />
      </div>
    </div>
  );
}