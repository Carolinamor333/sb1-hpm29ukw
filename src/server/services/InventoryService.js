import { db } from '../db';
import { predictDemand } from './AIService';
import logger from '../utils/logger';

export class InventoryService {
  async optimizeInventory(productId) {
    try {
      // Get historical data
      const historicalData = await db('inventory_history')
        .where('product_id', productId)
        .orderBy('date', 'desc')
        .limit(90);

      // Get current inventory levels
      const inventory = await db('inventory')
        .where('product_id', productId)
        .first();

      // Generate AI prediction
      const prediction = await predictDemand(historicalData);

      // Calculate optimal order quantity
      const orderQuantity = this.calculateOptimalOrderQuantity(
        inventory,
        prediction
      );

      return {
        currentStock: inventory.quantity,
        prediction,
        recommendedOrder: orderQuantity,
        reorderPoint: inventory.reorder_point
      };
    } catch (error) {
      logger.error('Inventory optimization failed:', error);
      throw error;
    }
  }

  private calculateOptimalOrderQuantity(inventory, prediction) {
    const safetyStock = inventory.reorder_point * 0.5;
    const economicOrderQuantity = Math.sqrt(
      (2 * prediction.annualDemand * inventory.ordering_cost) / 
      inventory.holding_cost
    );

    return Math.max(
      economicOrderQuantity,
      prediction.demand - inventory.quantity + safetyStock
    );
  }
}