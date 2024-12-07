import { useState, useEffect } from 'react';

export function useAnalyticsData(timeRange, category) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockData = {
          metrics: {
            orderFulfillment: 94.5,
            onTimeDelivery: 92.3,
            averageFulfillmentTime: 2.3,
            supplyChainCosts: 283500,
            defectRate: 0.8
          },
          trends: {
            daily: generateTrendData(7),
            weekly: generateTrendData(4),
            monthly: generateTrendData(12)
          }
        };

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
  }, [timeRange, category]);

  return { data, loading, error };
}

function generateTrendData(points) {
  return Array.from({ length: points }, (_, i) => ({
    period: i + 1,
    value: Math.floor(Math.random() * 1000) + 500
  }));
}