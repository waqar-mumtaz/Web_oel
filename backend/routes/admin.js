import express from 'express';
import {
  adminLogin,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/adminController.js';

const router = express.Router();

// Auth
router.post('/login', adminLogin);

// Products CRUD
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Orders
router.get('/orders', getAllOrders);
router.put('/orders/:id', updateOrderStatus);
router.delete('/orders/:id', deleteOrder);

export default router;

