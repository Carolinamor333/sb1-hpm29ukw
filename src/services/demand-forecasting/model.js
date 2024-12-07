export class DemandForecastModel {
  constructor() {
    this.weights = {
      sales: 0.6,
      season: 0.1,
      price: -0.2,
      stock: 0.1
    };
    this.baseline = 100;
  }

  train(data) {
    // In a real implementation, we would calculate optimal weights
    // For now, we use pre-defined weights for demonstration
    console.log('Model trained with sample data');
  }

  predict(features) {
    // Simple weighted sum prediction
    const weightedSum = Object.entries(features).reduce((sum, [key, value]) => {
      return sum + (value * (this.weights[key] || 0));
    }, 0);
    
    // Add baseline and ensure non-negative
    return Math.max(0, this.baseline + weightedSum);
  }

  // Helper method to evaluate model performance
  evaluate(testData) {
    const predictions = testData.map(item => ({
      actual: item.demand,
      predicted: this.predict(item.features)
    }));

    const mse = predictions.reduce((sum, { actual, predicted }) => {
      return sum + Math.pow(actual - predicted, 2);
    }, 0) / predictions.length;

    return {
      mse,
      predictions
    };
  }
}