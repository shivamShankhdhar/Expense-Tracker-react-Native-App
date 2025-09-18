import dotenv from "dotenv";
import express from "express";
import { initDb } from "./config/db";
import router from "./routes/transactions-route";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT!;

app.use("/api/transactions", router);

initDb().then(() => {
  app.listen(PORT, "0.0.0.0", async () => {
    console.log(`Server is running on PORT http://0.0.0.0:${PORT}`);
  });
});
