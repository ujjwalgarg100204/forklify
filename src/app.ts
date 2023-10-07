import express, { Express } from "express";
import dotenv from "dotenv";
import config from "./config/config";
import IndexRouter from "./routes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

// apply all the configuration
config(app);

// import all routes
app.use("/", IndexRouter);

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
