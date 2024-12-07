import { StarIcon } from '@heroicons/react/24/solid';

const suppliers = [
  {
    id: 1,
    name: 'Supplier X',
    rating: 4.8,
    onTimeDelivery: '98%',
    qualityScore: '4.9',
    responseTime: '2h',
    status: 'active'
  },
  {
    id: 2,
    name: 'Supplier Y',
    rating: 4.2,
    onTimeDelivery: '92%',
    qualityScore: '4.5',
    responseTime: '4h',
    status: 'active'
  },
  {
    id: 3,
    name: 'Supplier Z',
    rating: 3.9,
    onTimeDelivery: '85%',
    qualityScore: '4.0',
    responseTime: '6h',
    status: 'warning'
  }
];

export default function SupplierTable() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Top Suppliers</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                On-Time Delivery
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quality Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Response Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900 mr-1">{supplier.rating}</span>
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    parseInt(supplier.onTimeDelivery) >= 95
                      ? 'bg-green-100 text-green-800'
                      : parseInt(supplier.onTimeDelivery) >= 90
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {supplier.onTimeDelivery}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {supplier.qualityScore}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {supplier.responseTime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}