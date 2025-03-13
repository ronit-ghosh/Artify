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
        res.status(400).json({ msg: "Something went wrong while fetching models!" })
        console.error(error)
    }
})

router.get("/status/:falreqid", async (req, res) => {
    const falAiReqId = req.params.falreqid;
    try {
        const model = await prisma.model.findFirst({
            where: {
                AND: [{ falAiReqId }, { userId: req.userId }]
            },
            select: {
                id: true,
                name: true,
                thumbnail: true,
                tensorPath: true,
                status:true
            }
        })
        res.json({
            modelId: model?.id,
            name: model?.name,
            thumbnail: model?.thumbnail,
            tensorPath: model?.tensorPath
        })
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong while fetching model status!" })
        console.error(error)
    }
})