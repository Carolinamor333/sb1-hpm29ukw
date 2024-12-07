export function formatMetric(value, type) {
  switch (type) {
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    case 'time':
      return `${value} days`;
    default:
      return value.toString();
  }
}

export function calculateTrend(current, previous) {
  const difference = current - previous;
  const percentageChange = (difference / previous) * 100;
  
  return {
    value: Math.abs(percentageChange).toFixed(1),
    direction: difference >= 0 ? 'increase' : 'decrease'
  };
}

export function aggregateData(data, timeRange) {
  if (!data || !data.trends) return [];
  
  const trendData = data.trends[timeRange] || [];
  return trendData.map(point => ({
    period: point.period,
    value: point.value
  }));
}