const dotenv = require("dotenv");
dotenv.config(); // 🚨 Load this first!
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const morgan = require('morgan')

const userRoute = require('./routes/userRoutes');
const productRoute = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes')
const checkoutRoutes = require('./routes/checkRout')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const subscriberRoutes = require('./routes/subscribeRoute')
const adminRoutes = require('./routes/adminRoutes')
const productAdminRoutes = require('./routes/productAdminRoutes')
const adminOrderRoutes = require('./routes/adminOrderRoutes')

console.log("📦 JWT_SECRET =", process.env.JWT_SECRET);



const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan())

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
    res.send("Hello from server");
});

// User routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart",cartRoutes);
app.use("/api/checkout",checkoutRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/upload",uploadRoutes)
app.use("/api/subscribe",subscriberRoutes)


//Admin
app.use("/api/admin/users",adminRoutes)
app.use("/api/admin/products",productAdminRoutes)
app.use("/api/admin/orders",adminOrderRoutes)


app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
