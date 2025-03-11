"use client"

import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/lib/config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function page() {
    const { getToken } = useAuth()
    const params = useSearchParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const planType = params.get('plan')

    async function handlePayment() {
        setLoading(true)
        const token = await getToken()
        try {
            const response = await axios.post(`${BACKEND_URL}/api/payments/order`, {
                amount: planType === "basic" ? 2000 : 5000,
                planType
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: planType === 'basic' ? (2000) : (5000),
                currency: "INR",
                name: "Artify",
                description: "Image Generation AI",
                order_id: response.data.orderId,
                handler: function (response: any) {
                    console.log(response)
                },
                prefill: {
                    name: "Ronit Ghosh",
                    email: "work.ronitghosh@gmail.com",
                    contact: "+91 7003265196"
                },
                theme: {
                    color: "#1e1e1e"
                }
            }
            // @ts-ignore
            const rzp1 = new window.Razorpay(options)
            rzp1.open()
        } catch (error) {
            setLoading(false)
            console.error(error)
        } finally {
            setLoading(false)
            router.push('/')
        }
    }
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <Button onClick={handlePayment}>
                {loading ? "Loading..." : "Pay"}
            </Button>
        </div>
    )
}
