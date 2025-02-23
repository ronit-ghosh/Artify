import { prisma } from "@repo/db/client";
import { Router } from "express";

export const router = Router()

router.post("/webhook/train", async (req, res) => {
    console.log(req.body)
    const falAiReqId = req.body.request_id
    const tensorPath = req.body.tensorPath
    try {
        await prisma.model.updateMany({
            where: { falAiReqId },
            data: {
                status: "generated",
                tensorPath
            }
        })
        res.json({ msg: "Model Trained" })
    } catch (error) {
        res.status(400).json({ msg: "Error while training model!" })
    }
})

router.post("/webhook/image", async (req, res) => {
    console.log(req.body)
    const falAiReqId = req.body.request_id
    const imageUrl = req.body.imageUrl

    try {
        await prisma.outputImages.updateMany({
            where: { falAiReqId },
            data: {
                status: "completed",
                imageUrl
            }
        })
        res.json({ msg: "Images Generation Completed" })
    } catch (error) {
        res.status(400).json({ msg: "Error while generating images!" })
    }
})
