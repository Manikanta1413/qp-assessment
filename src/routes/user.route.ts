import { Router } from 'express';
import { authenticateUser } from '../middleware/authMiddleware';
import { getGroceries, bookGroceries } from '../controllers/user.controller';

const userRouter = Router();

// Get list of available groceries (Public Route)
userRouter.get('/groceries', getGroceries);

// Book multiple grocery items (Protected Route - User must be authenticated)
userRouter.post('/order', authenticateUser, bookGroceries);

export default userRouter;