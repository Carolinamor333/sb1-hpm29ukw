import { useState } from 'react';
import { Menu } from '@headlessui/react';
import { DocumentArrowDownIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { 
  generateExcelReport, 
  generatePDFReport, 
  generateCSVReport, 
  generateJSONReport 
} from '../../utils/reportGenerator';

const reports = [
  {
    id: 1,
    name: 'Supply Chain Performance',
    description: 'Complete overview of KPIs and metrics',
    data: [
      { metric: 'Order Fulfillment Rate', value: '94%', trend: '+2.3%' },
      { metric: 'On-Time Delivery', value: '92%', trend: '+1.5%' },
      { metric: 'Inventory Turnover', value: '12x', trend: '+0.8x' }
    ]
  },
  {
    id: 2,
    name: 'Inventory Analysis',
    description: 'Detailed stock levels and turnover rates',
    data: [
      { item: 'Product A', stock: 150, reorderPoint: 50, turnover: '4.2x' },
      { item: 'Product B', stock: 75, reorderPoint: 30, turnover: '3.8x' },
      { item: 'Product C', stock: 200, reorderPoint: 100, turnover: '5.1x' }
    ]
  },
  {
    id: 3,
    name: 'Supplier Performance',
    description: 'Delivery times and quality metrics',
    data: [
      { supplier: 'Supplier X', onTimeDelivery: '95%', quality: '98%', responseTime: '2h' },
      { supplier: 'Supplier Y', onTimeDelivery: '92%', quality: '96%', responseTime: '4h' },
      { supplier: 'Supplier Z', onTimeDelivery: '88%', quality: '94%', responseTime: '6h' }
    ]
  }
];

const downloadFormats = [
  { name: 'Excel (.xlsx)', handler: generateExcelReport },
  { name: 'PDF (.pdf)', handler: generatePDFReport },
  { name: 'CSV (.csv)', handler: generateCSVReport },
  { name: 'JSON (.json)', handler: generateJSONReport }
];

export default function DownloadReports() {
  const [downloading, setDownloading] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleDownload = async (report, format) => {
    setDownloading(true);
    try {
      await format.handler(report.data, report.name);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
      setSelectedReport(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Download Reports</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div>
                <h3 className="text-sm font-medium text-gray-900">{report.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{report.description}</p>
              </div>
              
              <Menu as="div" className="relative">
                <Menu.Button
                  className={`flex items-center justify-center px-4 py-2 rounded-md ${
                    downloading
                      ? 'bg-gray-100 cursor-wait'
                      : 'text-white bg-blue-600 hover:bg-blue-700'
                  }`}
                  disabled={downloading}
                >
                  <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                  <span>Download</span>
                  <ChevronDownIcon className="h-4 w-4 ml-2" />
                </Menu.Button>
                
                <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    {downloadFormats.map((format, index) => (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } w-full text-left px-4 py-2 text-sm text-gray-700`}
                            onClick={() => handleDownload(report, format)}
                          >
                            {format.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Menu>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}