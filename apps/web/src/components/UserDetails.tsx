"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { useAuth } from "@clerk/nextjs";
import { Card } from './ui/card'
import { BrainCircuit, ImageIcon, ImagesIcon, MessageSquare, Wallet } from 'lucide-react'

const StatCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: any }) => (
    <Card className="p-6 space-y-2 bg-card">
        <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon className="w-5 h-5" />
            <span>{title}</span>
        </div>
        <div className="text-3xl font-bold text-card-foreground">{value}</div>
    </Card>
);

export default function UserDetails() {
    const { getToken } = useAuth()
    const limit = 10
    const offset = 0
    const [images, setImages] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async function fetchImages() {
            setLoading(true)
            try {
                const token = await getToken()
                const res = await axios.get(`${BACKEND_URL}/api/images/bulk?limit=${limit}&offset=${offset}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setImages(res.data.imageUrls)
                setLoading(false)
            } catch (error) {
                console.error(error)
                setLoading(false)
            }
        })()
    }, [])


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Images Generated" value={`${images.length}`} icon={ImagesIcon} />
                <StatCard title="Models" value="12" icon={BrainCircuit} />
                <StatCard title="Prompts" value="456" icon={MessageSquare} />
                <StatCard title="Balance" value="$789" icon={Wallet} />
            </div>

            <Card className={`mb-8 p-6 bg-card border-border ${images.length === 0 ? 'hidden' : 'block'}`}>
                <h2 className="text-xl font-semibold mb-4">Generated Images</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {images.map((i) => (
                        <div
                            key={i}
                            className="aspect-square rounded-lg bg-muted flex items-center justify-center"
                        >
                            <ImageIcon className="w-10 h-10 text-muted-foreground" />
                        </div>
                    ))}
                </div>
            </Card>
        </>
    )
}
