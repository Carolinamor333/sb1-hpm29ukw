import logger from '../../utils/logger.js';

export class SupplyChainOptimizer {
  constructor() {
    this.constraints = {
      minStock: 100,
      maxStock: 1000,
      leadTime: 5,
      safetyStock: 200
    };
  }

  calculateOptimalOrder(currentStock, demandForecast, leadTime) {
    try {
      const safetyStock = this.constraints.safetyStock;
      const expectedDemand = demandForecast * leadTime;
      const reorderPoint = expectedDemand + safetyStock;
      
      if (currentStock <= reorderPoint) {
        const orderQuantity = this.calculateEconomicOrderQuantity(demandForecast);
        return {
          shouldOrder: true,
          quantity: orderQuantity,
          reorderPoint
        };
      }

      return {
        shouldOrder: false,
        quantity: 0,
        reorderPoint
      };
    } catch (error) {
      logger.error('Error in optimal order calculation:', error);
      throw new Error('Failed to calculate optimal order');
    }
  }

  calculateEconomicOrderQuantity(annualDemand) {
    const orderingCost = 100; // Fixed cost per order
    const holdingCost = 0.2; // Annual holding cost per unit
    const eoq = Math.sqrt((2 * annualDemand * orderingCost) / holdingCost);
    return Math.round(eoq);
  }

  optimizeInventoryLevels(currentStock, historicalDemand) {
    try {
      const avgDemand = this.calculateAverageDemand(historicalDemand);
      const variability = this.calculateDemandVariability(historicalDemand);
      
      const optimalSafetyStock = this.calculateSafetyStock(avgDemand, variability);
      const optimalReorderPoint = avgDemand * this.constraints.leadTime + optimalSafetyStock;
      
      return {
        optimalSafetyStock,
        optimalReorderPoint,
        recommendedMinStock: Math.max(optimalSafetyStock, this.constraints.minStock),
        recommendedMaxStock: Math.min(optimalReorderPoint * 2, this.constraints.maxStock)
      };
    } catch (error) {
      logger.error('Error in inventory optimization:', error);
      throw new Error('Failed to optimize inventory levels');
    }
  }

  calculateAverageDemand(historicalDemand) {
    return historicalDemand.reduce((sum, demand) => sum + demand, 0) / historicalDemand.length;
  }

  calculateDemandVariability(historicalDemand) {
    const avg = this.calculateAverageDemand(historicalDemand);
    const variance = historicalDemand.reduce((sum, demand) => {
      return sum + Math.pow(demand - avg, 2);
    }, 0) / historicalDemand.length;
    return Math.sqrt(variance);
  }

  calculateSafetyStock(avgDemand, variability) {
    const serviceLevel = 0.95; // 95% service level
    const serviceFactor = 1.645; // Z-score for 95% service level
    return Math.round(serviceFactor * variability * Math.sqrt(this.constraints.leadTime));
  }
}