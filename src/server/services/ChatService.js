import OpenAI from 'openai';
import { db } from '../db';
import logger from '../utils/logger';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class ChatService {
  async generateResponse(message, history) {
    try {
      // Get inventory data
      const inventoryData = await this.getInventoryData();
      
      // Prepare system message
      const systemMessage = {
        role: 'system',
        content: `You are an AI supply chain assistant. You have access to the following inventory data:
          ${JSON.stringify(inventoryData, null, 2)}
          
          Provide helpful insights and recommendations based on this data.
          Always be specific and data-driven in your responses.
          If suggesting reorder quantities, explain your reasoning.`
      };

      // Prepare conversation history
      const messages = [
        systemMessage,
        ...history,
        { role: 'user', content: message }
      ];

      // Generate response
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 500
      });

      return completion.choices[0].message.content;
    } catch (error) {
      logger.error('Chat generation failed:', error);
      throw error;
    }
  }

  private async getInventoryData() {
    try {
      // Get current inventory levels
      const inventory = await db('inventory')
        .select('*')
        .join('products', 'inventory.product_id', 'products.id');

      // Get recent orders
      const recentOrders = await db('orders')
        .select('*')
        .orderBy('created_at', 'desc')
        .limit(10);

      // Get demand predictions
      const predictions = await db('predictions')
        .select('*')
        .orderBy('created_at', 'desc')
        .limit(5);

      return {
        inventory,
        recentOrders,
        predictions
      };
    } catch (error) {
      logger.error('Failed to fetch inventory data:', error);
      throw error;
    }
  }
}