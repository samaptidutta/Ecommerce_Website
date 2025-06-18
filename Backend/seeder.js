const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/Cart');
const products = require('./data/products');
const bcrypt = require('bcryptjs'); // Add bcrypt if your User model hashes passwords

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Function to seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();
    console.log('Existing data cleared');

    // Create a default admin user
    const password = await bcrypt.hash('123456', 10); // Hash password
    const createdUser = await User.create({
      name: 'Admin User',
      email: 'admin@gmail.com',
      password,
      role: 'admin',
    });
    console.log('Admin user created:', createdUser.email);

    // Assign the default user ID to each product
    const userId = createdUser._id;
    const sampleProducts = products.map((product) => ({
      ...product,
      user: userId,
    }));

    // Insert the products into the database
    await Product.insertMany(sampleProducts);
    console.log('Product data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding the data:', error.message);
    process.exit(1);
  }
};

seedData();