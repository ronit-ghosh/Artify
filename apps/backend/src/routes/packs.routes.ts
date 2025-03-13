import { createPacks, generateImageFromPack } from "@repo/common/types";
import { prisma } from "@repo/db/client";
import { Router } from "express";
import { FalAiModel } from "../ai-models/FalAiModel";
import AuthMiddleware from "../middlewares/Auth";
import CreditsMiddleware from "../middlewares/Credit";
import DeductCredit from "../utils/deductCredit";

export const router = Router();

const falAiModel = new FalAiModel()

router.post("/generate", AuthMiddleware, CreditsMiddleware, async (req, res) => {
    const { modelId, packId } = req.body;
    const userId = req.userId!

    const parsedValue = generateImageFromPack.safeParse({ modelId, packId });
    if (!parsedValue.success) {
        res.status(411).json({ msg: "Inputs are not valid!" });
        return
    }

    try {
        const prompts = await prisma.packPrompts.findMany({
            where: { packId }
        })

        const hasCredits = DeductCredit(Math.round(prompts.length + 1), userId)

        if (!hasCredits) {
            res.status(400).json({ msg: "Not enough credits!" })
            return
        }

        const model = await prisma.model.findUnique({
            where: { id: modelId },
            select: { tensorPath: true }
        });

        if (!model) {
            res.status(400).json({ msg: "Could not find the model" });
            return
        }
        const reqIds: { request_id: string }[] = await Promise.all(
            prompts.map(prompt => falAiModel.generateImage(prompt.prompt, model.tensorPath!))
        );

        const images = await prisma.outputImages.createManyAndReturn({
            data: prompts.map((prompt, index) => ({
                prompt: prompt.prompt,
                modelId,
                userId,
                imageUrl: "",
                falAiReqId: reqIds[index].request_id
            })),
            select: { falAiReqId: true }
        })

        res.json({
            msg: "Photos Generated Successfully",
            falReqIds: images.map(image => image.falAiReqId)
        })

    } catch (error) {
        res.status(400).json({ msg: "Error Creating Images" })
    }

});

router.post("/create", AuthMiddleware, async (req, res) => {
    const { name, prompts, description, category, imageUrl } = req.body;

    const parsedValue = createPacks.safeParse({ name, prompts, description, category, imageUrl })
    if (!parsedValue.success) {
        res.status(411).json({ msg: "Inputs are not valid!" });
        return
    }

    try {
        const result = await prisma.$transaction(async (prisma) => {
            const existingPack = await prisma.packs.findFirst({ where: { name } })
            if (existingPack) {
                res.status(400).json({ msg: "A Pack with This Name Already Exists!" })
                return
            }

            const packId = await prisma.packs.create({
                data: {
                    name,
                    category,
                    description,
                    imageUrl
                },
                select: { id: true }
            });

            await prisma.packPrompts.createMany({
                data: prompts.map((prompt: {
                    name: string
                    prompt: string
                }) => ({
                    name: prompt.name,
                    prompt: prompt.prompt,
                    packId: packId.id
                }))
            })

            return packId
        })

        res.json(result)

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Something went wrong!", error })
    }
})

router.get("/bulk", async (req, res) => {
    try {
        const packs = await prisma.packs.findMany({
            where: { isApproved: true },
            select: {
                id: true,
                name: true,
                description: true,
                category: true,
                imageUrl: true,
                packPrompts: true
            }
        })
        res.json({ msg: "Packs Fetched Successfuly", packs })
    } catch (error) {
        res.status(400).json({ msg: "Error Fetching Packs!" })
        console.error(error)
    }
});


router.post("/status", AuthMiddleware, async (req, res) => {
    const falReqIds = req.body.falReqIds
    try {
        const response = await prisma.outputImages.findMany({
            where: {
                falAiReqId: {
                    in: falReqIds
                }
            },
            select: { imageUrl: true }
        })
        res.json({ imageUrls: response.map(url => url.imageUrl) })
    } catch (error) {
        console.error(error)
    }
})