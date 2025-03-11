import { prisma } from "@repo/db/client";
import { FalAiModel } from "../ai-models/FalAiModel";
import { Router } from "express";
import { fal } from "@fal-ai/client";

export const router = Router()
const falAiModel = new FalAiModel()

router.post("/webhook/train", async (req, res) => {
    console.log("Training webhook endpoint: ", req.body)
    const falAiReqId = req.body.request_id as string

    const result = await fal.queue.result("fal-ai/flux-lora", { requestId: falAiReqId })
    // @ts-ignore FIXME:
    const tensorPath = result.data.diffusers_lora_file.url

    const { headshotImageUrl } = await falAiModel.generateHeadshot(tensorPath)

    try {
        await prisma.model.updateMany({
            where: { falAiReqId },
            data: {
                status: "generated",
                tensorPath,
                thumbnail: headshotImageUrl
            }
        })
        res.json({ msg: "Model Trained" })
    } catch (error) {
        res.status(400).json({ msg: "Error while training model!" })
    }
})

router.post("/webhook/image", async (req, res) => {
    console.log("Image webhook endpoint: ",req.body)
    const falAiReqId = req.body.request_id
    const imageUrl = req.body.payload.images[0].url

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
