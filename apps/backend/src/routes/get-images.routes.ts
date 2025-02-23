import { prisma } from "@repo/db/client";
import { Router } from "express";

export const router = Router();

router.get("/bulk", (req, res) => {
    const imageIds = req.query.imageId as string[]
    const limit = req.query.limit as string ?? "10"
    const offset = req.query.offset as string ?? "0"
    const userId = req.userId!
    try {
        const imagesData = prisma.outputImages.findMany({
            where: {
                userId,
                id: { in: imageIds }
            },
            take: parseInt(limit, 10),
            skip: parseInt(offset, 10)
        })
        res.json({ msg: "Images Fetched Successfully", imagesData })
    } catch (error) {
        res.status(400).json({ msg: "Error Fetching Images!" })
    }
});