import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/book.routes.js";
import errorMiddleware from "./middlewares/error.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// swagger
const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Test route
app.get("/", (req, res) => {
  res.send("API working...");
});

// routes
app.use("/api/v1/books", router);

// error handling
app.use(errorMiddleware);

export default app;
