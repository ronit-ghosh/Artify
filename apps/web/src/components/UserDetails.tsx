"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { useAuth } from "@clerk/nextjs";
import { Card } from './ui/card'
import { Images, RotateCcw, Wallet } from 'lucide-react'
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export default function UserDetails() {
    const { getToken } = useAuth()
    const [limit] = useState<number>(12)
    const [offset, setOffset] = useState<number>(0)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [images, setImages] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const [balance, setBalance] = useState<number>(0)

    const handleDownload = async (imageUrl: string) => {
        if (!imageUrl) return
        try {
            setIsDownloading(true)
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `${imageUrl.split('/')[5]}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setIsDownloading(false)
            // Free up memory
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            setIsDownloading(false)
            console.error("Download failed:", error);
        }
    }

    async function fetchImages() {
        setLoading(true)
        try {
            const token = await getToken()
            const res = await axios.get(`${BACKEND_URL}/api/images/bulk?limit=${limit}&offset=${offset}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setImages(prev => [...prev, ...res.data.imageUrls])
            setTotalCount(res.data.totalCount)
        } catch (error) {
            console.error(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    function loadMore() {
        if (offset + limit < totalCount) {
            setOffset(prevOffset => prevOffset + limit);
        }
    }

    useEffect(() => {
        fetchImages()
        getBalance()
    }, [offset])

    async function getBalance() {
        try {
            const token = await getToken()
            const response = await axios.get(`${BACKEND_URL}/api/user-credits/balance`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setBalance(response.data.balance)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="flex justify-between items-center mb-8 px-4">
                <h1 className="text-4xl font-bold">Dashboard</h1>
                <div className="flex items-center gap-3">
                    <RotateCcw
                        onClick={getBalance}
                        size={12}
                        className="cursor-pointer"
                    />
                    <span
                        className="flex items-center gap-2 text-xl">
                        <Wallet />
                        {balance}
                    </span>
                </div>
            </div>
            <Card className={`mb-8 p-6 bg-card border-border`}>
                <h2 className="text-xl font-semibold mb-4">Generated Images</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
                    {
                        images.length === 0 && <div className={`${loading ? 'hidden' : 'block'} col-span-4 place-items-center justify-center flex gap-2 text-xl text-neutral-500 `}>
                            <Images /> No Photos Generated Yet
                        </div>
                    }
                    {loading ?
                        [1, 1, 1, 1].map((_, i) => <Skeleton key={i} className="w-full h-56 rounded-lg" />) :
                        images.map((image, i) => (
                            <div
                                key={i}
                                className="rounded-lg bg-muted flex items-center justify-center"
                            >
                                <Dialog>
                                    <DialogTrigger className='cursor-pointer'>
                                        <Image
                                            src={image}
                                            width={5000}
                                            height={5000}
                                            className="object-cover rounded-md"
                                            alt="image" />
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle className='w-full flex justify-end px-4'>
                                            <Button
                                                onClick={() => handleDownload(image)}>
                                                {isDownloading ? 'Downloading...' : 'Download'}
                                            </Button>
                                        </DialogTitle>
                                        <Image
                                            src={image}
                                            alt={'image'}
                                            width={5000}
                                            height={5000}
                                            className="w-full object-cover rounded-md mb-3"
                                        />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        ))}
                </div>
                <Button
                    onClick={loadMore}
                    className={`w-30 mx-auto ${totalCount <= 12 || images.length === totalCount ? "hidden" : "block"}`}>
                    {loading ? "Loading..." : "Load More"}
                </Button>
            </Card >
        </>
    )
}
