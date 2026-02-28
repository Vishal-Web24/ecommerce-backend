// seed.js - Run this once to populate sample products in MongoDB
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const connectDB = require("./config/db");

const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    description: "Latest Apple smartphone with A17 Pro chip",
    price: 999.99,
    category: "electronics",
    image: "https://via.placeholder.com/300?text=iPhone15",
    stock: 50,
    rating: 4.8,
  },
  {
    name: "Samsung 4K TV",
    description: '65" 4K Smart TV with HDR',
    price: 799.99,
    category: "electronics",
    image: "https://via.placeholder.com/300?text=SamsungTV",
    stock: 20,
    rating: 4.5,
  },
  {
    name: "Nike Running Shoes",
    description: "Lightweight and comfortable running shoes",
    price: 89.99,
    category: "clothing",
    image: "https://via.placeholder.com/300?text=NikeShoes",
    stock: 100,
    rating: 4.7,
  },
  {
    name: "Levi's Jeans",
    description: "Classic straight fit denim jeans",
    price: 59.99,
    category: "clothing",
    image: "https://via.placeholder.com/300?text=LevisJeans",
    stock: 75,
    rating: 4.4,
  },
  {
    name: "JavaScript: The Good Parts",
    description: "A must-read book for every JavaScript developer",
    price: 29.99,
    category: "books",
    image: "https://via.placeholder.com/300?text=JSBook",
    stock: 200,
    rating: 4.9,
  },
  {
    name: "Clean Code",
    description: "A handbook of agile software craftsmanship by Robert Martin",
    price: 34.99,
    category: "books",
    image: "https://via.placeholder.com/300?text=CleanCode",
    stock: 150,
    rating: 4.8,
  },
  {
    name: "Yoga Mat",
    description: "Non-slip premium yoga mat",
    price: 24.99,
    category: "sports",
    image: "https://via.placeholder.com/300?text=YogaMat",
    stock: 80,
    rating: 4.3,
  },
  {
    name: "Dumbbells Set",
    description: "Adjustable 5-25kg dumbbell set",
    price: 149.99,
    category: "sports",
    image: "https://via.placeholder.com/300?text=Dumbbells",
    stock: 30,
    rating: 4.6,
  },
];

const seedDB = async () => {
  await connectDB();
  await Product.deleteMany({});
  console.log("🗑️  Cleared existing products");
  await Product.insertMany(sampleProducts);
  console.log(`✅ Inserted ${sampleProducts.length} sample products`);
  mongoose.connection.close();
  console.log("🔌 Database connection closed");
};

seedDB();