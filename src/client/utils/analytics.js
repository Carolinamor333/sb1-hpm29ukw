export function calculateTrends(data, metric) {
  if (!data || !data.length) return [];
  
  const values = data.map(item => item[metric]);
  const max = Math.max(...values);
  
  return values.map(value => (value / max) * 100);
}

export function formatMetricValue(value, type) {
  switch (type) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    
    case 'percentage':
      return `${value.toFixed(1)}%`;
    
    case 'number':
      return new Intl.NumberFormat('en-US').format(value);
    
    default:
      return value;
  }
}

export function calculateChange(current, previous) {
  if (!previous) return { value: 0, type: 'neutral' };
  
  const change = ((current - previous) / previous) * 100;
  return {
    value: Math.abs(change).toFixed(1),
    type: change >= 0 ? 'increase' : 'decrease'
  };
}