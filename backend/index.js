import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});
const app = express();

const corsOptions = {
  origin: ["http://internsphere.vercel.app", "https://internsphere.vercel.app"],
  methods: ["POST", "GET", "OPTIONS", "PUT", "DELETE", "PATCH"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  exposedHeaders: ["set-cookie"],
};

// CORS middleware first
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Additional CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://internsphere.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("hello");
});

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});