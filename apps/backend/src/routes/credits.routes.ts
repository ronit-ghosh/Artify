import { prisma } from "@repo/db/client"
import { Router } from "express"

export const router = Router()

router.get("/balance", async (req, res) => {
    const userId = req.userId
    try {
        const response = await prisma.userCredit.findUnique({
            where: { userId }
        })
        if (!response) {
            res.json({ msg: "You don't have any credits!" })
            return
        }
        res.json({ msg: "Credits fetched successfully", balance: response.amount })
    } catch (error) {
        console.error(error)
        res.json({ msg: "Something went wrong while fetching credits!" })
    }
})