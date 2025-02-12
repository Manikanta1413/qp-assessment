var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Grocery } from '../entities/Grocery';
import { Order } from '../entities/Order';
import { AppDataSource } from '../config/database';
import { OrderItem } from '../entities/OrderItem';
/**
 * Get list of available groceries
 */
export const getGroceries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groceryRepo = AppDataSource.getRepository(Grocery);
        const groceries = yield groceryRepo.find(); // Fetch all available groceries
        res.status(200).json({ success: true, data: groceries });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
/**
 * Book multiple grocery items in a single order
 */
export const bookGroceries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(403).json({ success: false, message: 'Unauthorized' });
        return;
    }
    const { items } = req.body; // Expecting an array of { groceryId, quantity }
    const userId = req.user.id; // Extract user ID from the authenticated request
    if (!items || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({ success: false, message: 'Invalid request data' });
    }
    const queryRunner = AppDataSource.createQueryRunner();
    yield queryRunner.connect();
    yield queryRunner.startTransaction();
    try {
        const orderRepo = queryRunner.manager.getRepository(Order);
        const groceryRepo = queryRunner.manager.getRepository(Grocery);
        const orderItemRepo = queryRunner.manager.getRepository(OrderItem);
        // Create new order
        const newOrder = orderRepo.create({ userId });
        yield orderRepo.save(newOrder);
        // Process each grocery item
        for (const item of items) {
            const grocery = yield groceryRepo.findOne({ where: { id: item.groceryId } });
            if (!grocery || grocery.stock < item.quantity) {
                throw new Error(`Insufficient stock for item ID ${item.groceryId}`);
            }
            // Reduce stock
            grocery.stock -= item.quantity;
            yield groceryRepo.save(grocery);
            // Create order item
            const orderItem = orderItemRepo.create({
                orderId: newOrder.id,
                groceryId: item.groceryId,
                quantity: item.quantity,
            });
            yield orderItemRepo.save(orderItem);
        }
        yield queryRunner.commitTransaction();
        res.status(201).json({ success: true, message: 'Order placed successfully', orderId: newOrder.id });
    }
    catch (error) {
        yield queryRunner.rollbackTransaction();
        res.status(400).json({ success: false, message: error.message });
    }
    finally {
        yield queryRunner.release();
    }
});
