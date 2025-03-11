import { prisma } from "@repo/db/client";
import type { NextFunction, Request, Response } from "express";

export default async function CreditsMiddleware(req: Request, res: Response, next: NextFunction) {
    const userId = req.userId
    if (!userId) {
        res.status(400).json({ msg: "Can't find User Id!" })
        return
    }
    try {
        const credits = await prisma.userCredit.findFirst({
            where: { userId },
            select: { amount: true }
        })

        if (!credits) {
            res.status(400).json({ msg: "Can't find Credits for this user!" })
            return
        }

        if (credits.amount === 0) {
            res.status(400).json({ msg: "You don't have enough credits!" })
            return
        }
        next()

    } catch (error) {
        console.error(error)
        res.status(403).json({ msg: "Error while fetching user Credits!" })
        return
    }
}