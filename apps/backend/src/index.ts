import express from "express";
import cors from 'cors';
import AuthMiddleware from "./middlewares/Auth";
import CreditsMiddleware from "./middlewares/Credit";
import { router as aiRouter } from "./routes/ai.routes";
import { router as packsRouter } from "./routes/packs.routes";
import { router as imageRouter } from "./routes/images.routes";
import { router as modelRouter } from "./routes/models.routes";
import { router as falAiRouter } from "./routes/fal-ai-webhook.routes"
import { router as r2Router } from "./routes/r2.routes"
import { router as clerkRouter } from "./routes/clerk.routes"
import { router as paymentsRouter } from "./routes/payments.routes"
import { router as creditsRouter } from "./routes/credits.routes"

export const app = express();
app.use(express.json());
app.use(cors({
    origin: ["https://artify.ronitghosh.site", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use("/api/ai", AuthMiddleware, CreditsMiddleware, aiRouter);
app.use("/api/packs", packsRouter);
app.use("/api/images", AuthMiddleware, imageRouter);
app.use("/api/models", AuthMiddleware, modelRouter);
app.use("/api/fal-ai", falAiRouter);
app.use("/api/pre-signed-url", r2Router);
app.use("/api/clerk", clerkRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/user-credits", AuthMiddleware, creditsRouter);

app.get("/api/healthcheck", (req, res) => {
    const url = process.env.WEBHOOK_BASE_URL
    res.json({ msg: "Backend is running...", url })
});