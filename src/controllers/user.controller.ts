import { AuthenticatedRequest } from "../types/express"
import { Request, Response } from 'express';
import { Grocery } from '../entities/Grocery';
import { Order } from '../entities/Order';
import { AppDataSource } from '../config/database';
import { OrderItem } from '../entities/OrderItem';

/**
 * Get list of available groceries
 */
export const getGroceries = async (req: Request, res: Response): Promise<void> => {
  try {
    const groceryRepo = AppDataSource.getRepository(Grocery);
    const groceries = await groceryRepo.find();

    res.status(200).json({ success: true, data: groceries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Book multiple grocery items in a single order
 */
export const bookGroceries = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if(!req.user){
        res.status(403).json({ success: false, message: 'Unauthorized' });
        return;
    }
  const { items } = req.body;
  const userId = req.user.id; 

  if (!items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ success: false, message: 'Invalid request data' });
  }

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const orderRepo = queryRunner.manager.getRepository(Order);
    const groceryRepo = queryRunner.manager.getRepository(Grocery);
    const orderItemRepo = queryRunner.manager.getRepository(OrderItem);

    // Create new order
    const newOrder = orderRepo.create({ userId });
    await orderRepo.save(newOrder);

    // Process each grocery item
    for (const item of items) {
      const grocery = await groceryRepo.findOne({ where: { id: item.groceryId } });

      if (!grocery || grocery.stock < item.quantity) {
        throw new Error(`Insufficient stock for item ID ${item.groceryId}`);
      }

      // Reduce stock
      grocery.stock -= item.quantity;
      await groceryRepo.save(grocery);

      // Create order item
      const orderItem = orderItemRepo.create({
        orderId: newOrder.id,
        groceryId: item.groceryId,
        quantity: item.quantity,
      });
      await orderItemRepo.save(orderItem);
    }

    await queryRunner.commitTransaction();

    res.status(201).json({ success: true, message: 'Order placed successfully', orderId: newOrder.id });
  } catch (error: any) {
    await queryRunner.rollbackTransaction();
    res.status(400).json({ success: false, message: error.message });
  } finally {
    await queryRunner.release();
  }
};