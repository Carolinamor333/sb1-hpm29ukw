import { DocumentArrowDownIcon, FunnelIcon } from '@heroicons/react/24/outline';

export default function AnalyticsHeader({ 
  timeRange, 
  setTimeRange, 
  category, 
  setCategory, 
  onDownloadReport, 
  downloading 
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl font-semibold text-gray-900">Supply Chain Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor performance metrics and optimize your supply chain
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2 min-w-[200px]">
            <FunnelIcon className="h-4 w-4 text-gray-400" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-colors duration-200"
            >
              <option value="all">All Categories</option>
              <option value="raw">Raw Materials</option>
              <option value="finished">Finished Goods</option>
              <option value="packaging">Packaging</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-colors duration-200"
            >
              <option value="day">Last 24 Hours</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last Quarter</option>
              <option value="custom">Custom Range</option>
            </select>

            <button 
              className={`flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                downloading ? 'opacity-75 cursor-wait' : ''
              }`}
              onClick={onDownloadReport}
              disabled={downloading}
            >
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              {downloading ? 'Generating...' : 'Export Report'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}