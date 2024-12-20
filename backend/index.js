import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import cookieParser from "cookie-parser";
dotenv.config();
import path from "path";

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log(" MongoDB is Connected!"))
  .catch((err) => console.log(err));

const __dirname = path.resolve();

const app = express();
app.use(express.json());

app.use(cookieParser());
const port=2000
app.listen(port, () => {
  console.log(`listening on port ${port}` );
});

//home route
app.get("/", (req, res) => {
  res.send("Hello from Node API server!");
});

//user routes
app.use("/api/user", userRoute);
// app.use("/api/user/",updateRoute)


//auth routes
app.use("/api/auth", authRoute);

//post routes
app.use("/api/post", postRoute);


//login routes
// app.use(express.static(path.join(__dirname, "client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    message,
    success: false,
    statusCode,
    message,
  });
});
