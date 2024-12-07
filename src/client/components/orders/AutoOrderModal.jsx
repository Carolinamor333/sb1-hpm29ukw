import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { predictDemand, generateOrderRecommendation } from '../../services/aiPrediction';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function AutoOrderModal({ isOpen, onClose, onConfirm }) {
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      generatePrediction();
    }
  }, [isOpen]);

  async function generatePrediction() {
    setLoading(true);
    setError(null);
    
    try {
      // Mock historical data - in production, fetch from your API
      const historicalData = Array.from({ length: 90 }, (_, i) => ({
        date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)),
        demand: Math.floor(Math.random() * 100) + 50
      }));

      const predictionResult = await predictDemand(historicalData);
      setPrediction(predictionResult);

      // Mock inventory data - in production, fetch from your API
      const inventoryData = {
        currentStock: 250,
        reorderPoint: 100,
        orderingCost: 150,
        holdingCost: 10
      };

      const recommendationResult = await generateOrderRecommendation(
        inventoryData,
        predictionResult
      );
      setRecommendation(recommendationResult);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-2xl shadow-xl">
          <div className="relative p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <LightBulbIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  AI Order Recommendation
                </Dialog.Title>
                <Dialog.Description className="text-sm text-gray-500">
                  Based on historical data and current inventory levels
                </Dialog.Description>
              </div>
            </div>

            {loading ? (
              <div className="py-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-sm text-gray-500">Generating recommendation...</p>
              </div>
            ) : error ? (
              <div className="py-8 text-center">
                <p className="text-red-600">{error}</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={generatePrediction}
                >
                  Retry
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-6 mb-8">
                  {/* Prediction Section */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Demand Prediction
                    </h3>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-semibold text-gray-900">
                        {prediction?.demand || 0}
                      </span>
                      <span className="text-sm text-gray-500">units</span>
                    </div>
                  </div>

                  {/* Recommendation Section */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Recommended Order
                    </h3>
                    <div className="flex items-baseline space-x-2 mb-4">
                      <span className="text-2xl font-semibold text-gray-900">
                        {recommendation?.suggestedQuantity || 0}
                      </span>
                      <span className="text-sm text-gray-500">units</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="primary">
                        {recommendation?.confidence}% confidence
                      </Badge>
                    </div>
                  </div>

                  {/* Reasoning Section */}
                  {recommendation?.reasoning?.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">
                        Reasoning
                      </h3>
                      <ul className="space-y-2">
                        {recommendation.reasoning.map((reason, index) => (
                          <li
                            key={index}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => onConfirm(recommendation)}
                  >
                    Create Order
                  </Button>
                </div>
              </>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}