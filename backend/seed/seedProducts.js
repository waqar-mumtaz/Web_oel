import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const products = [
  // Clothing (5 products)
  {
    name: 'Classic Cotton T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    description: 'Comfortable 100% cotton t-shirt perfect for everyday wear. Available in multiple colors.',
    category: 'clothing',
    stockQuantity: 50,
  },
  {
    name: 'Slim Fit Denim Jeans',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    description: 'Modern slim fit jeans made from premium stretch denim for ultimate comfort.',
    category: 'clothing',
    stockQuantity: 35,
  },
  {
    name: 'Wool Blend Winter Coat',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400',
    description: 'Elegant wool blend coat to keep you warm during cold winter days.',
    category: 'clothing',
    stockQuantity: 20,
  },
  {
    name: 'Casual Sneakers',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400',
    description: 'Stylish and comfortable sneakers for casual everyday wear.',
    category: 'clothing',
    stockQuantity: 45,
  },
  {
    name: 'Summer Floral Dress',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400',
    description: 'Light and breezy floral dress perfect for summer occasions.',
    category: 'clothing',
    stockQuantity: 30,
  },

  // Books (5 products)
  {
    name: 'The Art of Programming',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
    description: 'A comprehensive guide to mastering programming concepts and best practices.',
    category: 'books',
    stockQuantity: 100,
  },
  {
    name: 'Mystery of the Lost City',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
    description: 'An exciting adventure novel that takes you on a journey through ancient civilizations.',
    category: 'books',
    stockQuantity: 75,
  },
  {
    name: 'Cooking Masterclass',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400',
    description: 'Learn to cook like a pro with 200+ recipes from world-renowned chefs.',
    category: 'books',
    stockQuantity: 60,
  },
  {
    name: 'Mindfulness & Meditation',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    description: 'A practical guide to finding peace and calm in your daily life.',
    category: 'books',
    stockQuantity: 80,
  },
  {
    name: 'Space Exploration History',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400',
    description: 'Explore the fascinating history of human space exploration with stunning photos.',
    category: 'books',
    stockQuantity: 40,
  },

  // Electronics (5 products)
  {
    name: 'Wireless Bluetooth Headphones',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    description: 'Premium noise-canceling headphones with 30-hour battery life.',
    category: 'electronics',
    stockQuantity: 25,
  },
  {
    name: 'Smart Watch Pro',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    description: 'Advanced smartwatch with health tracking, GPS, and app notifications.',
    category: 'electronics',
    stockQuantity: 30,
  },
  {
    name: 'Portable Power Bank 20000mAh',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400',
    description: 'High-capacity power bank to keep all your devices charged on the go.',
    category: 'electronics',
    stockQuantity: 55,
  },
  {
    name: 'Mechanical Gaming Keyboard',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400',
    description: 'RGB mechanical keyboard with customizable keys for the ultimate gaming experience.',
    category: 'electronics',
    stockQuantity: 40,
  },
  {
    name: 'Wireless Mouse',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
    category: 'electronics',
    stockQuantity: 65,
  },

  // Pets (5 products)
  {
    name: 'Premium Dog Food 10kg',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400',
    description: 'Nutritious premium dog food made with real chicken and vegetables.',
    category: 'pets',
    stockQuantity: 40,
  },
  {
    name: 'Cat Scratching Post Tower',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400',
    description: 'Multi-level scratching post with cozy hideouts for your feline friend.',
    category: 'pets',
    stockQuantity: 20,
  },
  {
    name: 'Automatic Pet Feeder',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
    description: 'Programmable automatic feeder with portion control for dogs and cats.',
    category: 'pets',
    stockQuantity: 35,
  },
  {
    name: 'Cozy Pet Bed Large',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1520087619250-584c0cbd35e8?w=400',
    description: 'Ultra-soft pet bed with memory foam for maximum comfort.',
    category: 'pets',
    stockQuantity: 50,
  },
  {
    name: 'Interactive Dog Toy Set',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400',
    description: 'Set of 5 interactive toys to keep your dog entertained and active.',
    category: 'pets',
    stockQuantity: 60,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products successfully!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();

