import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/users', UserControllers.createUser);

router.get('/users', UserControllers.getAllUser);

router.get('/users/:userId', UserControllers.getSpecificUser);

router.put('/users/:userId', UserControllers.updateUser);

router.delete('/users/:userId', UserControllers.deleteUser);

router.put('/users/:userId/orders', UserControllers.userOrderUpdate); 

router.get('/users/:userId/orders', UserControllers.getUserOrder);

router.get('/users/:userId/orders/total-price', UserControllers.userOrderPriceCalculate)

export const UserRoutes = router;