import { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, StarIcon } from '@heroicons/react/24/outline';

const suppliersData = [
  { 
    id: 1, 
    name: 'Supplier X', 
    contact: 'John Doe',
    email: 'john@supplierx.com',
    phone: '+1 234-567-8900',
    rating: 4.5,
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'Supplier Y', 
    contact: 'Jane Smith',
    email: 'jane@suppliery.com',
    phone: '+1 234-567-8901',
    rating: 3.8,
    status: 'Active'
  },
  { 
    id: 3, 
    name: 'Supplier Z', 
    contact: 'Bob Johnson',
    email: 'bob@supplierz.com',
    phone: '+1 234-567-8902',
    rating: 4.2,
    status: 'Inactive'
  },
];

export default function Suppliers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredSuppliers = suppliersData.filter(supplier =>
    (filterStatus === 'all' || supplier.status.toLowerCase() === filterStatus.toLowerCase()) &&
    (supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Supplier Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Add Supplier
        </button>
      </div>

      <div className="mb-6 flex space-x-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <FunnelIcon className="h-5 w-5 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
                <p className="text-sm text-gray-500">{supplier.contact}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                supplier.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {supplier.status}
              </span>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm">
                <span className="text-gray-500">Email:</span>
                <span className="ml-2">{supplier.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-gray-500">Phone:</span>
                <span className="ml-2">{supplier.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-gray-500">Rating:</span>
                <div className="ml-2 flex items-center">
                  <span className="mr-1">{supplier.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        className={`h-4 w-4 ${
                          index < Math.floor(supplier.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button className="text-blue-600 hover:text-blue-900">Edit</button>
              <button className="text-red-600 hover:text-red-900">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}