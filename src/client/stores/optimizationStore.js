import create from 'zustand';
import axios from 'axios';

const useOptimizationStore = create((set) => ({
  optimizationResults: null,
  loading: false,
  error: null,

  fetchOptimization: async (params) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/api/optimize', params);
      set({ optimizationResults: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch optimization results',
        loading: false 
      });
    }
  },

  resetOptimization: () => {
    set({ optimizationResults: null, error: null });
  }
}));

export default useOptimizationStore;