import axios from 'axios';
import { AI_CONFIG } from '../config/constants';

export async function generateAIResponse(message, context) {
  try {
    const response = await axios.post('/api/chat', {
      message,
      context,
      config: {
        model: AI_CONFIG.MODEL,
        maxTokens: AI_CONFIG.MAX_TOKENS,
        temperature: AI_CONFIG.TEMPERATURE
      }
    });

    return response.data;
  } catch (error) {
    console.error('AI response generation failed:', error);
    throw new Error('Failed to generate AI response');
  }
}

export function analyzeInventoryData(data) {
  return {
    lowStockItems: data.filter(item => item.quantity <= item.reorderPoint),
    totalValue: data.reduce((sum, item) => sum + (item.quantity * item.price), 0),
    turnoverRate: calculateTurnoverRate(data),
    recommendations: generateRecommendations(data)
  };
}

function calculateTurnoverRate(data) {
  // AI-driven turnover rate calculation
  return data.map(item => ({
    id: item.id,
    name: item.name,
    rate: (item.salesCount / ((item.startingInventory + item.endingInventory) / 2))
  }));
}

function generateRecommendations(data) {
  // AI-driven inventory recommendations
  return data.map(item => {
    const recommendation = {
      id: item.id,
      name: item.name,
      actions: []
    };

    if (item.quantity <= item.reorderPoint) {
      recommendation.actions.push({
        type: 'reorder',
        quantity: calculateOptimalOrderQuantity(item)
      });
    }

    if (item.turnoverRate < 0.5) {
      recommendation.actions.push({
        type: 'promote',
        reason: 'Low turnover rate'
      });
    }

    return recommendation;
  });
}

function calculateOptimalOrderQuantity(item) {
  // Economic Order Quantity (EOQ) formula
  const annualDemand = item.salesCount * (365 / item.daysSinceFirstSale);
  const orderingCost = item.orderingCost || 100; // Default ordering cost
  const holdingCost = item.holdingCost || item.price * 0.2; // Default holding cost 20% of item price

  return Math.sqrt((2 * annualDemand * orderingCost) / holdingCost);
}