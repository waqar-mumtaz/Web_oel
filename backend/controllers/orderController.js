import Order from "../models/Order.js";
import Product from "../models/Product.js";

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public (Guest Checkout)
export const createOrder = async (req, res) => {
  try {
    const { items, customerInfo } = req.body;

    // Validate items array
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items in order",
      });
    }

    // Validate customer info
    if (
      !customerInfo ||
      !customerInfo.name ||
      !customerInfo.email ||
      !customerInfo.address ||
      !customerInfo.city ||
      !customerInfo.postalCode
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide complete customer information",
      });
    }

    // Verify products exist and have sufficient stock
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`,
        });
      }

      if (product.stockQuantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.stockQuantity}`,
        });
      }

      // Update stock
      product.stockQuantity -= item.quantity;
      await product.save();

      // Add to order items
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
      });

      totalAmount += product.price * item.quantity;
    }

    // Create order
    const order = await Order.create({
      items: orderItems,
      customerInfo,
      totalAmount,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
