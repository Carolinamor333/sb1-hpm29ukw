import { PlusIcon } from '@heroicons/react/24/outline';

const suppliers = [
  {
    name: 'Randy Gouse',
    role: 'Primary Supplier',
    level: 'Senior',
    avatar: 'RG'
  },
  {
    name: 'Gianna Schleifer',
    role: 'Logistics Partner',
    level: 'Middle',
    avatar: 'GS'
  }
];

export default function LeftPanel() {
  return (
    <div className="space-y-8">
      {/* Let's Connect Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Let's Connect</h2>
          <button className="text-sm text-gray-500 hover:text-gray-700">See all</button>
        </div>

        <div className="space-y-4">
          {suppliers.map((supplier) => (
            <div key={supplier.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                  {supplier.avatar}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{supplier.name}</p>
                  <p className="text-xs text-gray-500">{supplier.role}</p>
                </div>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded-full">
                <PlusIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Features Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Unlock Premium Features</h2>
        <p className="text-sm text-gray-500 mb-4">
          Get access to exclusive benefits and boost your supply chain efficiency
        </p>
        <button className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors">
          Upgrade now
        </button>
      </div>
    </div>
  );
}