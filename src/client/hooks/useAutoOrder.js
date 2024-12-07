import { useState } from 'react';
import { predictDemand, generateOrderRecommendation } from '../services/aiPrediction';

export function useAutoOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function createAutoOrder() {
    setLoading(true);
    setError(null);

    try {
      // In production, fetch real historical data
      const historicalData = getMockHistoricalData();
      const prediction = await predictDemand(historicalData);
      
      // In production, fetch real inventory data
      const inventoryData = getMockInventoryData();
      const recommendation = await generateOrderRecommendation(
        inventoryData,
        prediction
      );

      // Create the order based on the recommendation
      const order = {
        quantity: recommendation.suggestedQuantity,
        predictedDemand: prediction.demand,
        confidence: recommendation.confidence,
        reasoning: recommendation.reasoning,
        createdAt: new Date().toISOString(),
        status: 'pending',
        type: 'auto'
      };

      // In production, send to your API
      console.log('Created auto order:', order);
      
      return order;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    createAutoOrder,
    loading,
    error
  };
}

function getMockHistoricalData() {
  return Array.from({ length: 90 }, (_, i) => ({
    date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)),
    demand: Math.floor(Math.random() * 100) + 50
  }));
}

function getMockInventoryData() {
  return {
    currentStock: 250,
    reorderPoint: 100,
    orderingCost: 150,
    holdingCost: 10
  };
}