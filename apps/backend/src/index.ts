import express from "express";
import cors from 'cors';
import { router as aiRouter } from "./routes/ai.routes";
import { router as packsRouter } from "./routes/packs.routes";
import { router as imageRouter } from "./routes/get-images.routes";
import { router as falAiRouter } from "./routes/fal-ai-webhook.routes"
import { router as r2Router } from "./routes/r2.routes"
import AuthMiddleware from "./middlewares";

export const app = express();
app.use(express.json());
app.use(cors())


app.use("/api/ai", AuthMiddleware, aiRouter);
app.use("/api/packs", packsRouter);
app.use("/api/image", AuthMiddleware, imageRouter);
app.use("/api/fal-ai", AuthMiddleware, falAiRouter);
app.use("/api/pre-signed-url",  r2Router);
