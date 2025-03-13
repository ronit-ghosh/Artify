import { razorpayOrder } from "@repo/common/types";
import { prisma } from "@repo/db/client";
import { Router } from "express";
import Razorpay from "razorpay";
import crypto from "crypto"
import AuthMiddleware from "../middlewares/Auth";

export const router = Router()

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

router.post('/order', AuthMiddleware, async (req, res) => {
    const amount = req.body.amount;
    const planType = req.body.planType;

    const parsedValue = razorpayOrder.safeParse({ amount, planType })
    if (!parsedValue.success) {
        res.status(400).json({ msg: "Invalid Inputs!" })
    }

    const options = {
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: `artify_${Date.now().toString(36)}`,
        notes: {
            user: req.userId!,
            plan: planType
        }
    }

    try {
        const order = await razorpay.orders.create(options)
        if (!order) {
            res.status(400).json({ msg: "Error while creating order!" })
        }

        const newOrder = await prisma.subscription.create({
            data: {
                userId: req.userId!,
                orderId: order.id,
                plan: planType,
                paymentId: ''
            }
        })

        res.json({
            msg: "Order created successfully",
            orderId: order.id,
            dbOrderId: newOrder.id,
            amount: order.amount
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ msg: "Something went wrong while creating payment order!" })
    }
})

router.post('/razorpay', async (req, res) => {
    try {
        const body = JSON.stringify(req.body)
        console.log("Razorpay💰: ",body)

        const signature = req.get('x-razorpay-signature')

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
            .update(body)
            .digest("hex");

        if (signature !== expectedSignature) {
            res.status(400).json({ msg: "Invalid Signature!" })
            return
        }

        const event = JSON.parse(body)

        if (event.event === "payment.captured" && event.payload.payment.entity.status === "captured") {
            try {
                const result = await prisma.$transaction(
                    async (prisma) => {
                        const updatedSubscription = await prisma.subscription.update({
                            data: {
                                status: 'captured',
                                paymentId: event.payload.payment.entity.id
                            },
                            where: {
                                orderId: event.payload.payment.entity.order_id.toLowerCase()
                            }
                        })

                        const paymentDetails = event.payload.payment.entity.notes
                        const upadatesCredits = await prisma.userCredit.upsert({
                            where: { userId: paymentDetails.user },
                            update: { amount: paymentDetails.plan === "basic" ? { increment: 500 } : { increment: 1300 } },
                            create: {
                                userId: paymentDetails.user,
                                amount: paymentDetails.plan === "basic" ? 500 : 1300
                            }
                        })
                        return { updatedSubscription, upadatesCredits }
                    })

                res.json({ msg: "Payment Captured, Credits Added", result })
            } catch (error) {
                console.error(error)
                res.status(400).json({ msg: "Transaction Failed!" })
            }
            return
        } else if (event.event === "payment.failed") {
            await prisma.subscription.update({
                data: {
                    status: "failed",
                    paymentId: event.payload.payment.entity.id
                },
                where: {
                    orderId: event.payload.payment.entity.order_id
                }
            })
            res.json({ msg: "Payment Failed" })
            return
        } else {
            console.log("Event: ", JSON.stringify(event))
            return
        }
    } catch (error) {
        console.error(error)
        res.status(403).json({ msg: "Something went wrong while verifying the order!" })
    }
})