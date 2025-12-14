import express from 'express';
import {
  getProducts,
  getProductById,
  getCategories,
} from '../controllers/productController.js';

const router = express.Router();

// GET /api/products/categories - Get all categories
router.get('/categories', getCategories);

// GET /api/products - Get all products (with search/filter)
router.get('/', getProducts);

// GET /api/products/:id - Get single product
router.get('/:id', getProductById);

export default router;

