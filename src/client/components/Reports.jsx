import { useState } from 'react';
import { 
  DocumentArrowDownIcon,
  ChartBarIcon,
  TruckIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const performanceData = [
  { month: 'Jan', efficiency: 85, accuracy: 90, fulfillment: 88 },
  { month: 'Feb', efficiency: 88, accuracy: 85, fulfillment: 87 },
  { month: 'Mar', efficiency: 82, accuracy: 89, fulfillment: 90 },
  { month: 'Apr', efficiency: 89, accuracy: 92, fulfillment: 85 },
  { month: 'May', efficiency: 90, accuracy: 88, fulfillment: 92 },
  { month: 'Jun', efficiency: 87, accuracy: 91, fulfillment: 89 },
];

const reports = [
  {
    id: 1,
    name: 'Performance Metrics',
    description: 'Detailed analysis of supply chain performance',
    icon: ChartBarIcon,
    type: 'performance'
  },
  {
    id: 2,
    name: 'Inventory Report',
    description: 'Current stock levels and turnover rates',
    icon: TruckIcon,
    type: 'inventory'
  },
  {
    id: 3,
    name: 'Cost Analysis',
    description: 'Breakdown of operational costs and trends',
    icon: CurrencyDollarIcon,
    type: 'costs'
  },
  {
    id: 4,
    name: 'Supplier Analysis',
    description: 'Supplier performance and reliability metrics',
    icon: BuildingOfficeIcon,
    type: 'suppliers'
  }
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState('performance');
  const [timeRange, setTimeRange] = useState('month');

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <p className="mt-1 text-sm text-gray-500">
            Generate and analyze supply chain reports
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {reports.map((report) => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report.type)}
            className={`p-6 rounded-lg border ${
              selectedReport === report.type
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <report.icon className={`h-8 w-8 ${
              selectedReport === report.type ? 'text-blue-500' : 'text-gray-400'
            }`} />
            <h3 className={`mt-4 text-lg font-medium ${
              selectedReport === report.type ? 'text-blue-900' : 'text-gray-900'
            }`}>
              {report.name}
            </h3>
            <p className={`mt-1 text-sm ${
              selectedReport === report.type ? 'text-blue-500' : 'text-gray-500'
            }`}>
              {report.description}
            </p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Performance Metrics</h2>
        </div>
        <div className="p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="efficiency" stroke="#4F46E5" name="Efficiency" />
                <Line type="monotone" dataKey="accuracy" stroke="#10B981" name="Accuracy" />
                <Line type="monotone" dataKey="fulfillment" stroke="#F59E0B" name="Fulfillment" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Average Efficiency</h3>
              <p className="mt-1 text-2xl font-semibold">87%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Average Accuracy</h3>
              <p className="mt-1 text-2xl font-semibold">89%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Average Fulfillment</h3>
              <p className="mt-1 text-2xl font-semibold">88%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}