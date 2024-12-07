import { useState } from 'react';
import { 
  ShoppingCartIcon, 
  TruckIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const orders = [
  {
    id: 'ORD-001',
    customer: 'Acme Corp',
    status: 'processing',
    value: '$2,500',
    progress: 25,
    alert: false
  },
  {
    id: 'ORD-002',
    customer: 'TechStart Inc',
    status: 'in-transit',
    value: '$1,800',
    progress: 65,
    alert: false
  },
  {
    id: 'ORD-003',
    customer: 'Global Solutions',
    status: 'delayed',
    value: '$3,200',
    progress: 45,
    alert: true
  },
  {
    id: 'ORD-004',
    customer: 'Innovate LLC',
    status: 'delivered',
    value: '$950',
    progress: 100,
    alert: false
  }
];

const statusConfig = {
  processing: {
    icon: ShoppingCartIcon,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    text: 'Processing'
  },
  'in-transit': {
    icon: TruckIcon,
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
    text: 'In Transit'
  },
  delayed: {
    icon: ExclamationTriangleIcon,
    color: 'text-red-600',
    bg: 'bg-red-100',
    text: 'Delayed'
  },
  delivered: {
    icon: CheckCircleIcon,
    color: 'text-green-600',
    bg: 'bg-green-100',
    text: 'Delivered'
  }
};

export default function OrderPipeline() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Order Pipeline</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={order.id}
                className={`p-4 rounded-lg border ${
                  order.alert ? 'border-red-200 bg-red-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${status.bg}`}>
                      <StatusIcon className={`h-5 w-5 ${status.color}`} />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">{order.id}</h3>
                      <p className="text-sm text-gray-500">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{order.value}</p>
                    <p className={`text-sm ${status.color}`}>{status.text}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      order.status === 'delayed' ? 'bg-red-600' : 'bg-blue-600'
                    }`}
                    style={{ width: `${order.progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}