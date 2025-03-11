import { generateImage, TrainModel } from "@repo/common/types";
import { prisma } from "@repo/db/client";
import { Router } from "express";
import { FalAiModel } from "../ai-models/FalAiModel";
import AuthMiddleware from "../middlewares/Auth";

export const router = Router();
const falAiModel = new FalAiModel()

router.post("/training", AuthMiddleware, async (req, res) => {
    const { name, type, age, ethnicity, eyecolor, bald, zipUrl } = req.body;
    const userId = req.userId!

    const parsedValue = TrainModel.safeParse({ name, type, age, ethnicity, eyecolor, bald, zipUrl });
    if (!parsedValue.success) {
        res.status(411).json({ msg: "Inputs are not valid!" });
        return
    }

    try {
        const { request_id } = await falAiModel.trainModel(zipUrl, name)

        const response = await prisma.model.create({
            data: {
                name,
                type,
                age,
                ethnicity,
                eyecolor,
                bald,
                zipUrl,
                falAiReqId: request_id,
                userId
            }
        });
        res.json({ msg: "Model created successfully", modelId: response.id, request_id });
    } catch (error) {
        res.status(400).json({ msg: "Error occured while creating model!" });
    }
});

router.post("/generate", async (req, res) => {
    const { prompt, modelId } = req.body;
    const userId = req.userId!
    const parsedValue = generateImage.safeParse({ prompt, modelId });
    if (!parsedValue.success) {
        res.status(411).json({ msg: "Inputs are not valid!" });
        return;
    }

    try {
        const model = await prisma.model.findUnique({
            where: { id: modelId },
            select: { tensorPath: true }
        })

        if (!model || !model.tensorPath) {
            res.status(400).json({ msg: "Could not find the model" });
            return
        }
        const { request_id } = await falAiModel.generateImage(prompt, model.tensorPath);
        6
        const response = await prisma.outputImages.create({
            data: {
                prompt,
                modelId,
                userId,
                imageUrl: "",
                falAiReqId: request_id
            }
        });
        res.json({ msg: "Image generated successfully", imageId: response.id, request_id });
    } catch (error) {
        res.status(400).json({ msg: "Error occured while generating image!" });
        console.error(error)
    }
});
