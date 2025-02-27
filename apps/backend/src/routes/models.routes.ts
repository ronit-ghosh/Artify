import { prisma } from "@repo/db/client";
import { Router } from "express";

export const router = Router()

router.get("/", async (req, res) => {
    const userId = req.userId
    try {
        const models = await prisma.model.findMany({
            where: {
                OR: [{ userId }, { public: true }]
            }
        })
        res.json({ msg: "Models fetched successfully", models })
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong!" })
    }
})