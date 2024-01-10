import express from "express";
import mongoose from "mongoose";
import postRouter from "./routes/postRoute.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";

// 172.29.0.2 node-app ip
// 172.29.0.3 mongo-db ip
const app = express();
app.use(cors());
app.use(express.json());
app.enable("trust proxy");

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb://shiva:123shiva@mongo:27017/?authSource=admin"
    );
    console.log("MongoDB connected");

    // console.log(process.env.SESSION_SECRET, "secret");
  } catch (err) {
    console.log("MongoDB connection error", err);
  }
}

connectDB();

app.get("/api/v1", (req, res) => {
  console.log("Yes in this running");
  res.send("Hello World");
});
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
