const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require("./config/db");

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res)=>{
    res.send("API is running...");
})

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is connected on ${PORT}`);
})