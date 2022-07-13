import express from "express";
import "express-async-errors";
import { handleAppErrorMiddleware } from "./middlewares/handleAppError.middleware";

const app = express();
app.use(express.json());

app.use(handleAppErrorMiddleware);

export default app;
