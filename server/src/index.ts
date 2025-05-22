import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import clientRouter from "./routes/client.router";
import petRouter from "./routes/pet.router"
import productRouter from "./routes/product.router"
import serviceRouter from "./routes/service.router"
import statsRouter from "./routes/stats.router"
import rgRouter from "./routes/rg.router"
import phoneRouter from "./routes/phone.router"

const config = {
  port: Number(process.env.PORT),
  cors: process.env.CORS_URL,
};

const corsOptions = {
  origin: config.cors,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/clients", clientRouter);
app.use("/api/pets", petRouter)
app.use("/api/products", productRouter)
app.use("/api/services", serviceRouter)
app.use("/api/stats", statsRouter)
app.use("/api/rgs", rgRouter)
app.use("/api/phones", phoneRouter)

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
