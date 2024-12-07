import create from 'zustand';

const useOrderStore = create((set, get) => ({
  orders: [],
  loading: false,
  error: null,

  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newOrder = {
        id: `ORD-${Math.floor(Math.random() * 10000)}`,
        ...orderData,
        createdAt: new Date().toISOString()
      };

      set(state => ({
        orders: [newOrder, ...state.orders],
        loading: false
      }));

      return newOrder;
    } catch (error) {
      set({ 
        error: error.message || 'Failed to create order',
        loading: false 
      });
      throw error;
    }
  },

  getOrders: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockOrders = [
        {
          id: 'ORD-1234',
          customerName: 'John Doe',
          customerEmail: 'john@example.com',
          total: 1500,
          status: 'processing',
          createdAt: new Date().toISOString()
        },
        // Add more mock orders as needed
      ];

      set({ orders: mockOrders, loading: false });
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch orders',
        loading: false 
      });
    }
  }
}));

export default useOrderStore;