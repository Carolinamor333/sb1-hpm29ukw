import { ethers } from 'ethers';
import { db } from '../db';
import { SupplyChainContract } from '../contracts';
import logger from '../utils/logger';

export class OrderService {
  async createOrder(orderData, walletAddress) {
    try {
      // Create order in database
      const order = await db.transaction(async (trx) => {
        const [orderId] = await trx('orders').insert({
          buyer_address: walletAddress,
          seller_address: orderData.sellerAddress,
          amount: orderData.amount,
          status: 'pending',
          created_at: new Date()
        });

        // Create blockchain transaction
        const contract = new ethers.Contract(
          process.env.CONTRACT_ADDRESS,
          SupplyChainContract.abi,
          provider
        );

        const tx = await contract.createOrder(
          orderData.sellerAddress,
          ethers.utils.parseEther(orderData.amount.toString())
        );

        await tx.wait();

        // Update order with transaction hash
        await trx('orders')
          .where('id', orderId)
          .update({ transaction_hash: tx.hash });

        return orderId;
      });

      return order;
    } catch (error) {
      logger.error('Order creation failed:', error);
      throw error;
    }
  }
}