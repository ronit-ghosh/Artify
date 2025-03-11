import { prisma } from "@repo/db/client";
import { Router } from "express";

export const router = Router();

router.get("/bulk", async (req, res) => {
    const imageIds = req.query.imageId as string[]
    const limit = req.query.limit as string ?? "10"
    const offset = req.query.offset as string ?? "0"
    const userId = req.userId!
    try {
        const imagesData = await prisma.outputImages.findMany({
            where: {
                userId,
                id: { in: imageIds }
            },
            take: parseInt(limit, 10),
            skip: parseInt(offset, 10)
        })
        const urls = imagesData.map(image => {
            if (image.imageUrl) {
                return image.imageUrl
            }
        })
        res.json({ msg: "Images Fetched Successfully", imageUrls: urls })
    } catch (error) {
        res.status(400).json({ msg: "Error Fetching Images!" })
    }
});

router.get('/status/:falreqid', async (req, res) => {
    const falAiReqId = req.params.falreqid;
    try {
        const image = await prisma.outputImages.findFirst({
            where: {
                AND: [{ falAiReqId }, { userId: req.userId }]
            },
            select: {
                imageUrl: true,
                status: true
            }
        })
        res.json({ imageUrl: image?.imageUrl, status: image?.status })
    } catch (error) {
        console.error(error)
        res.status(403).json({ msg: "Error while fetching image" })
    }
})