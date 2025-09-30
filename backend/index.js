const express = require('express');
const app = express();
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require("./config/db");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors({origin: "http://localhost:5173", credentials: true}));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // Max 100 requests per IP in this window
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res)=>{
    res.send("API is running...");
});

app.use((req, res)=>{
    res.status(404).json({message: "Route not found"});
})

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is connected on ${PORT}`);
})