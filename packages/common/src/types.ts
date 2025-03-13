import { z } from "zod";

export const TrainModel = z.object({
    name: z.string(),
    type: z.enum([
        "man",
        "woman",
        "other"
    ]),
    age: z.number(),
    ethnicity: z.enum([
        "white",
        "black",
        "asian_american",
        "east_asian",
        "south_east_asian",
        "south_asian",
        "middle_eastern",
        "pacific",
        "hispanic"
    ]),
    eyecolor: z.enum([
        "brown",
        "blue",
        "gray",
        "hazel"
    ]),
    bald: z.boolean(),
    zipUrl: z.string()
});

export const generateImage = z.object({
    prompt: z.string(),
    modelId: z.string()
})

export const generateImageFromPack = z.object({
    modelId: z.string(),
    packId: z.number(),
})

export const createPacks = z.object({
    name: z.string(),
    description: z.string(),
    category: z.string(),
    imageUrl: z.string(),
    prompts: z.array(z.object({
        name: z.string(),
        prompt: z.string()
    }))
})

export const packName = z.object({ name: z.string() })

export const razorpayOrder = z.object({
    amount: z.number(),
    planType: z.enum(["basic", "premium"])
})
