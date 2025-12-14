import express from 'express';
import { createOrder, getOrderById } from '../controllers/orderController.js';

const router = express.Router();

// POST /api/orders - Create new order
router.post('/', createOrder);

// GET /api/orders/:id - Get order by ID
router.get('/:id', getOrderById);

export default router;

