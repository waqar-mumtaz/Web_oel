# 🛒 ShopEase - Mini E-Commerce Platform

A full-stack e-commerce application built with **Node.js**, **Express**, **MongoDB**, **React 19**, and **Chakra UI**. This project demonstrates a complete shopping workflow including product browsing, cart management, checkout, and an admin panel.

![Tech Stack](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat&logo=redux&logoColor=white)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-319795?style=flat&logo=chakra-ui&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)

> 📖 **For detailed API documentation with examples, see [API_DOCS.md](./API_DOCS.md)**
>
> 📚 **For technical documentation (code explanations), see [TECHNICAL_DOCS.md](./TECHNICAL_DOCS.md)**
>
> 🏗️ **For system architecture diagrams, see [ARCHITECTURE.md](./ARCHITECTURE.md)**
>
> 🔄 **For state management (Redux) documentation, see [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md)**
>
> 🎯 **For challenges and creative decisions, see [CHALLENGES_AND_DECISIONS.md](./CHALLENGES_AND_DECISIONS.md)**

---

## ✨ Features

### 🛍️ Customer Store

- Browse products with images and descriptions
- Search products by name or description
- Filter products by category (Clothing, Books, Electronics, Pets)
- View detailed product information
- Add/remove items from cart
- Update cart quantities
- Persistent cart (saved in localStorage)
- Guest checkout with form validation
- Order confirmation page

### 🔐 Admin Panel

- Secure login (username: `admin`, password: `admin123`)
- Dashboard with statistics (total products, orders, revenue)
- Full product management (Create, Read, Update, Delete)
- Order management with status updates
- Delete orders

---

## 🛠️ Tech Stack

| Layer                | Technologies                                   |
| -------------------- | ---------------------------------------------- |
| **Backend**          | Node.js, Express.js, MongoDB, Mongoose         |
| **Frontend**         | React 19, Vite, Chakra UI, React Router DOM v7 |
| **State Management** | Redux Toolkit                                  |
| **HTTP Client**      | Axios                                          |
| **Styling**          | Chakra UI, Emotion                             |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your Windows machine:

### 1. Node.js (v18 or higher)

**Download & Install:**

1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS version** (Windows Installer .msi)
3. Run the installer and follow the prompts
4. ✅ Make sure to check "Automatically install necessary tools" if prompted

**Verify Installation:**
Open **Command Prompt** or **PowerShell** and run:

```cmd
node --version
npm --version
```

---

### 2. MongoDB (Local Installation)

**Option A: MongoDB Community Server (Recommended)**

1. Go to [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Select:
   - Version: Latest
   - Platform: Windows
   - Package: MSI
3. Download and run the installer
4. ✅ Select **"Complete"** installation
5. ✅ Check **"Install MongoDB as a Service"** (this starts MongoDB automatically)
6. ✅ Install **MongoDB Compass** (optional GUI tool)

**Verify MongoDB is Running:**

```cmd
# Open Command Prompt and run:
mongosh
```

If it connects, MongoDB is running! Type `exit` to close.

**If MongoDB is not running, start it manually:**

```cmd
net start MongoDB
```

---

**Option B: MongoDB Atlas (Cloud - Free)**

If you prefer not to install MongoDB locally:

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a **Free Tier Cluster** (M0 Sandbox)
4. Click **"Connect"** → **"Drivers"**
5. Copy the connection string
6. ⚠️ Go to **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (0.0.0.0/0)

---

### 3. Git (Optional - for cloning)

Download from [https://git-scm.com/download/win](https://git-scm.com/download/win)

---

### 4. Code Editor (Recommended)

Download **VS Code**: [https://code.visualstudio.com/](https://code.visualstudio.com/)

---

## 🚀 Installation

### Step 1: Open Command Prompt or PowerShell

Press `Win + R`, type `cmd` or `powershell`, and press Enter.

### Step 2: Navigate to Project Folder

```cmd
cd C:\path\to\ecomm
```

### Step 3: Install Backend Dependencies

```cmd
cd backend
npm install
```

### Step 4: Create Environment File

Create a new file named `.env` in the `backend` folder.

**Using Command Prompt:**

```cmd
echo MONGODB_URI=mongodb://localhost:27017/ecomm > .env
echo PORT=5001 >> .env
```

**Or manually create `backend\.env` with:**

```env
MONGODB_URI=mongodb://localhost:27017/ecomm
PORT=5001
```

> 💡 If using MongoDB Atlas, replace the MONGODB_URI with your Atlas connection string.

### Step 5: Seed the Database

This adds 20 sample products:

```cmd
npm run seed
```

**Expected output:**

```
✅ Connected to MongoDB
🗑️  Cleared existing products
✅ Seeded 20 products successfully!
```

### Step 6: Install Frontend Dependencies

```cmd
cd ..\frontend
npm install
```

---

## ▶️ Running the Project

You need **two Command Prompt/PowerShell windows** to run both servers:

### Window 1: Start Backend Server

```cmd
cd C:\path\to\ecomm\backend
npm run dev
```

**Expected output:**

```
🚀 Server running on port 5001
✅ MongoDB Connected: localhost
```

> ⚠️ Keep this window open!

### Window 2: Start Frontend Server

Open a **new** Command Prompt/PowerShell window:

```cmd
cd C:\path\to\ecomm\frontend
npm run dev
```

**Expected output:**

```
VITE v6.x.x  ready in XXX ms

➜  Local:   http://localhost:3000/
```

> ⚠️ Keep this window open too!

---

## 🌐 Access the Application

Open your browser and go to:

| URL                                                        | Description       |
| ---------------------------------------------------------- | ----------------- |
| [http://localhost:3000](http://localhost:3000)             | Customer Store    |
| [http://localhost:3000/admin](http://localhost:3000/admin) | Admin Panel Login |

### Admin Credentials

- **Username:** `admin`
- **Password:** `admin123`

---

## 📁 Project Structure

```
ecomm/
├── backend/                    # Express.js API
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js # Admin CRUD operations
│   │   ├── orderController.js # Order operations
│   │   └── productController.js # Product operations
│   ├── models/
│   │   ├── Order.js           # Order schema
│   │   └── Product.js         # Product schema
│   ├── routes/
│   │   ├── admin.js           # Admin routes
│   │   ├── orders.js          # Order routes
│   │   └── products.js        # Product routes
│   ├── seed/
│   │   └── seedProducts.js    # Database seeder
│   ├── .env                   # Environment variables
│   ├── package.json
│   └── server.js              # Express server entry
│
├── frontend/                   # React 19 + Vite
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── CartItem.jsx
│   │   │   ├── CategoryFilter.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── admin/         # Admin panel pages
│   │   │   │   ├── AdminDashboardPage.jsx
│   │   │   │   ├── AdminLayout.jsx
│   │   │   │   ├── AdminLoginPage.jsx
│   │   │   │   ├── AdminOrdersPage.jsx
│   │   │   │   └── AdminProductsPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── OrderConfirmationPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   └── ProductsPage.jsx
│   │   ├── services/
│   │   │   └── api.js         # Axios API calls
│   │   ├── store/
│   │   │   ├── cartSlice.js   # Redux cart state
│   │   │   └── store.js       # Redux store config
│   │   ├── App.jsx            # Main app with routes
│   │   ├── main.jsx           # Entry point
│   │   └── theme.js           # Chakra UI theme
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🔌 API Endpoints

### Products

| Method | Endpoint                   | Description                           |
| ------ | -------------------------- | ------------------------------------- |
| GET    | `/api/products`            | Get all products (with search/filter) |
| GET    | `/api/products/:id`        | Get single product                    |
| GET    | `/api/products/categories` | Get all categories                    |

**Query Parameters for GET /api/products:**

- `search` - Search by name or description
- `category` - Filter by category (clothing, books, electronics, pets)
- `inStock` - Filter in-stock products (true/false)

### Orders

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| POST   | `/api/orders`     | Create new order |
| GET    | `/api/orders/:id` | Get order by ID  |

### Admin

| Method | Endpoint                  | Description         |
| ------ | ------------------------- | ------------------- |
| POST   | `/api/admin/login`        | Admin login         |
| POST   | `/api/admin/products`     | Create product      |
| PUT    | `/api/admin/products/:id` | Update product      |
| DELETE | `/api/admin/products/:id` | Delete product      |
| GET    | `/api/admin/orders`       | Get all orders      |
| PUT    | `/api/admin/orders/:id`   | Update order status |
| DELETE | `/api/admin/orders/:id`   | Delete order        |

---

## 🎨 Product Categories

| Category       | Products                                            |
| -------------- | --------------------------------------------------- |
| 👕 Clothing    | T-shirts, Jeans, Coats, Sneakers, Dresses           |
| 📚 Books       | Programming, Fiction, Cooking, Wellness, Science    |
| 💻 Electronics | Headphones, Smartwatch, Power Bank, Keyboard, Mouse |
| 🐾 Pets        | Dog Food, Cat Tower, Pet Feeder, Pet Bed, Dog Toys  |

---

## 🔧 Available Scripts

### Backend (`\backend`)

```cmd
npm run dev      # Start server with hot reload
npm start        # Start server (production)
npm run seed     # Seed database with sample products
```

### Frontend (`\frontend`)

```cmd
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🐛 Troubleshooting (Windows)

### ❌ MongoDB Connection Failed

**Check if MongoDB is running:**

```cmd
# Open Command Prompt as Administrator
net start MongoDB
```

**If MongoDB service doesn't exist:**

1. Open Services (Win + R → `services.msc`)
2. Look for "MongoDB Server"
3. Right-click → Start

**Or start MongoDB manually:**

```cmd
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
```

---

### ❌ 'node' is not recognized

Node.js is not in your PATH. Either:

1. Reinstall Node.js and ensure "Add to PATH" is checked
2. Or add manually: `C:\Program Files\nodejs\` to System PATH

---

### ❌ Port Already in Use

Find and kill the process using port 5001:

```cmd
netstat -ano | findstr :5001
taskkill /PID <PID_NUMBER> /F
```

---

### ❌ EACCES Permission Error

Run Command Prompt as **Administrator**:

1. Search "cmd" in Start menu
2. Right-click → "Run as administrator"

---

### ❌ Frontend Can't Connect to Backend

1. Make sure backend is running on port 5001
2. Check `frontend\vite.config.js` has correct proxy:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5001',
    changeOrigin: true,
  },
},
```

---

## 📝 Quick Start Summary

```cmd
# 1. Install backend dependencies & seed database
cd backend
npm install
npm run seed

# 2. Start backend (keep this terminal open)
npm run dev

# 3. Open NEW terminal, install & start frontend
cd frontend
npm install
npm run dev

# 4. Open browser: http://localhost:3000
```

---

## 📝 License

This project is for educational purposes - University Mini E-Commerce Project.

---

## 👨‍💻 Author

Built with ❤️ as a university project demonstrating full-stack development with modern web technologies.
