import axios from 'axios';

export async function predictDemand(historicalData) {
  try {
    // In a real implementation, this would call your ML model
    // For now, we'll use a simple prediction algorithm
    const recentTrend = calculateTrend(historicalData);
    const seasonalFactor = calculateSeasonality(historicalData);
    const prediction = applyPredictionModel(recentTrend, seasonalFactor);
    
    return prediction;
  } catch (error) {
    console.error('Prediction error:', error);
    throw new Error('Failed to generate demand prediction');
  }
}

function calculateTrend(data) {
  // Simple moving average
  const recentData = data.slice(-30); // Last 30 days
  return recentData.reduce((sum, item) => sum + item.demand, 0) / recentData.length;
}

function calculateSeasonality(data) {
  // Basic seasonality factor based on month
  const month = new Date().getMonth();
  const seasonalFactors = {
    // Factors for each month (1.0 is baseline)
    0: 0.8,  // January
    1: 0.9,  // February
    2: 1.0,  // March
    3: 1.1,  // April
    4: 1.2,  // May
    5: 1.3,  // June
    6: 1.2,  // July
    7: 1.1,  // August
    8: 1.0,  // September
    9: 0.9,  // October
    10: 1.1, // November
    11: 1.3  // December
  };
  
  return seasonalFactors[month] || 1.0;
}

function applyPredictionModel(trend, seasonalFactor) {
  // Simple prediction model
  const baselinePrediction = trend * seasonalFactor;
  
  // Add some safety stock based on variability
  const safetyFactor = 1.2;
  
  return Math.round(baselinePrediction * safetyFactor);
}

export async function generateOrderRecommendation(inventory, prediction) {
  try {
    const recommendation = {
      suggestedQuantity: calculateOrderQuantity(inventory, prediction),
      confidence: calculateConfidence(inventory, prediction),
      reasoning: generateReasoning(inventory, prediction)
    };
    
    return recommendation;
  } catch (error) {
    console.error('Recommendation error:', error);
    throw new Error('Failed to generate order recommendation');
  }
}

function calculateOrderQuantity(inventory, prediction) {
  const safetyStock = inventory.reorderPoint * 0.5;
  const economicOrderQuantity = Math.sqrt(
    (2 * prediction.annualDemand * inventory.orderingCost) / inventory.holdingCost
  );
  
  return Math.max(
    economicOrderQuantity,
    prediction.demand - inventory.currentStock + safetyStock
  );
}

function calculateConfidence(inventory, prediction) {
  // Simple confidence score based on data quality
  const factors = {
    dataQuality: 0.8,
    seasonalityStrength: 0.7,
    trendStrength: 0.9
  };
  
  return Object.values(factors).reduce((acc, val) => acc * val, 1) * 100;
}

function generateReasoning(inventory, prediction) {
  const reasons = [];
  
  if (inventory.currentStock < inventory.reorderPoint) {
    reasons.push('Current stock below reorder point');
  }
  
  if (prediction.demand > inventory.currentStock) {
    reasons.push('Predicted demand exceeds current stock');
  }
  
  if (prediction.seasonalityFactor > 1.1) {
    reasons.push('Entering high-demand season');
  }
  
  return reasons;
}