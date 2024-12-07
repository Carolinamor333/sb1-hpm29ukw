import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const orderData = [
  { date: '2023-11-01', placed: 150, processed: 130, delivered: 120 },
  { date: '2023-11-02', placed: 180, processed: 160, delivered: 140 },
  { date: '2023-11-03', placed: 200, processed: 180, delivered: 170 },
  { date: '2023-11-04', placed: 160, processed: 150, delivered: 140 },
  { date: '2023-11-05', placed: 190, processed: 170, delivered: 160 },
  { date: '2023-11-06', placed: 220, processed: 200, delivered: 180 },
  { date: '2023-11-07', placed: 240, processed: 220, delivered: 200 }
];

const inventoryData = [
  { category: 'Raw Materials', turnover: 4.2, value: 125000 },
  { category: 'Work in Progress', turnover: 6.8, value: 85000 },
  { category: 'Finished Goods', turnover: 5.5, value: 195000 },
  { category: 'Packaging', turnover: 7.2, value: 45000 }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function PerformanceCharts({ timeRange, category }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-t-lg bg-gray-100 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow text-blue-700'
                  : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
              )
            }
          >
            Order Volume Trends
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected
                  ? 'bg-white shadow text-blue-700'
                  : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
              )
            }
          >
            Inventory Turnover
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="p-6">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={orderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="placed" stroke="#4F46E5" name="Orders Placed" />
                  <Line type="monotone" dataKey="processed" stroke="#10B981" name="Orders Processed" />
                  <Line type="monotone" dataKey="delivered" stroke="#F59E0B" name="Orders Delivered" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Tab.Panel>
          <Tab.Panel className="p-6">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis yAxisId="left" orientation="left" stroke="#4F46E5" />
                  <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="turnover" fill="#4F46E5" name="Turnover Rate" />
                  <Bar yAxisId="right" dataKey="value" fill="#10B981" name="Inventory Value ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}