import { prisma } from "@repo/db/client";

export default async function DeductCredit(value: number, userId: string) {
    try {
        const userCredit = await prisma.userCredit.findFirst({
            where: { userId },
            select: { amount: true }
        })

        if (!userCredit || userCredit.amount < value) {
            return false
        }

        const response = await prisma.userCredit.update({
            where: { userId },
            data: { amount: { decrement: value } }
        })

        if (!response) {
            return false
        }

        return true
    } catch (error) {
        return false
    }
}