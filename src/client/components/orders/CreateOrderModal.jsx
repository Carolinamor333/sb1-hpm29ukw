import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';

const initialProducts = [
  { id: 1, name: 'Product A', price: 100, available: 150 },
  { id: 2, name: 'Product B', price: 200, available: 75 },
  { id: 3, name: 'Product C', price: 150, available: 200 }
];

export default function CreateOrderModal({ isOpen, onClose, onSubmit }) {
  const [products, setProducts] = useState([{ productId: '', quantity: '', price: 0 }]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleAddProduct = () => {
    setProducts([...products, { productId: '', quantity: '', price: 0 }]);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const selectedProduct = initialProducts.find(p => p.id === Number(product.productId));
      return total + (selectedProduct?.price || 0) * (Number(product.quantity) || 0);
    }, 0);
  };

  const onSubmitForm = (data) => {
    const orderData = {
      ...data,
      products: products.map(product => ({
        productId: Number(product.productId),
        quantity: Number(product.quantity),
        price: initialProducts.find(p => p.id === Number(product.productId))?.price || 0
      })),
      total: calculateTotal(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    onSubmit(orderData);
    reset();
    setProducts([{ productId: '', quantity: '', price: 0 }]);
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      Create New Order
                    </Dialog.Title>
                    
                    <form onSubmit={handleSubmit(onSubmitForm)} className="mt-6 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Customer Name
                          </label>
                          <input
                            type="text"
                            {...register('customerName', { required: 'Customer name is required' })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                          />
                          {errors.customerName && (
                            <p className="mt-1 text-sm text-red-600">{errors.customerName.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Customer Email
                          </label>
                          <input
                            type="email"
                            {...register('customerEmail', { 
                              required: 'Email is required',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                              }
                            })}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                          />
                          {errors.customerEmail && (
                            <p className="mt-1 text-sm text-red-600">{errors.customerEmail.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Shipping Address
                        </label>
                        <textarea
                          {...register('shippingAddress', { required: 'Shipping address is required' })}
                          rows={3}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        />
                        {errors.shippingAddress && (
                          <p className="mt-1 text-sm text-red-600">{errors.shippingAddress.message}</p>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">Products</h4>
                          <button
                            type="button"
                            onClick={handleAddProduct}
                            className="text-sm text-blue-600 hover:text-blue-500"
                          >
                            Add Product
                          </button>
                        </div>

                        {products.map((product, index) => (
                          <div key={index} className="flex items-center space-x-4">
                            <div className="flex-1">
                              <select
                                value={product.productId}
                                onChange={(e) => {
                                  const newProducts = [...products];
                                  newProducts[index].productId = e.target.value;
                                  setProducts(newProducts);
                                }}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                              >
                                <option value="">Select Product</option>
                                {initialProducts.map(p => (
                                  <option key={p.id} value={p.id}>
                                    {p.name} (${p.price}) - {p.available} available
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="w-24">
                              <input
                                type="number"
                                min="1"
                                placeholder="Qty"
                                value={product.quantity}
                                onChange={(e) => {
                                  const newProducts = [...products];
                                  newProducts[index].quantity = e.target.value;
                                  setProducts(newProducts);
                                }}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                              />
                            </div>

                            {products.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveProduct(index)}
                                className="text-red-600 hover:text-red-500"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Total</p>
                          <p>${calculateTotal().toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                        >
                          Create Order
                        </button>
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}