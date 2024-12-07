import { useState, useEffect } from 'react';
import { format, subDays } from 'date-fns';

export function useAnalytics(timeRange) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
        const mockData = Array.from({ length: days }, (_, i) => ({
          date: format(subDays(new Date(), i), 'yyyy-MM-dd'),
          orders: Math.floor(Math.random() * 100) + 50,
          revenue: Math.floor(Math.random() * 10000) + 5000,
          fulfillment: Math.floor(Math.random() * 20) + 80
        })).reverse();

        setData(mockData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch analytics data');
        console.error('Analytics fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  return { data, loading, error };
}