import { z } from "zod"
import {
    TrainModel,
    generateImage,
    generateImageFromPack
} from "./types"

export type TrainModelTypes = z.infer<typeof TrainModel>
export type GenerateImageTypes = z.infer<typeof generateImage>
export type GenerateImageFromPackTypes = z.infer<typeof generateImageFromPack>