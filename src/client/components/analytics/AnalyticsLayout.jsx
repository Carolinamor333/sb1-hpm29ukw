import { useState } from 'react';
import LeftPanel from './panels/LeftPanel';
import CenterPanel from './panels/CenterPanel';
import RightPanel from './panels/RightPanel';

export default function AnalyticsLayout() {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-8">
        {/* Left Panel */}
        <div className="col-span-12 lg:col-span-3">
          <LeftPanel />
        </div>

        {/* Center Panel */}
        <div className="col-span-12 lg:col-span-6">
          <CenterPanel timeRange={timeRange} setTimeRange={setTimeRange} />
        </div>

        {/* Right Panel */}
        <div className="col-span-12 lg:col-span-3">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}