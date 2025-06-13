const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoute = require('./routes/userRoutes')



const app = express();
app.use(express.json());
app.use(cors());
dotenv.config()
console.log(process.env.PORT);


const PORT = process.env.PORT || 3000

//connected mongodb database
connectDB();


app.get("/",(req,res) =>{
    res.send("Hello from server")
})


// API Routes
app.use("/api/users", userRoute);

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    
})