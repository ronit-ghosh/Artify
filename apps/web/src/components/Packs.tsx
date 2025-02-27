"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { useAuth } from "@clerk/nextjs";
import { Model } from "./Generate";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "./ui/dialog";

export interface Pack {
    name: string
    prompt: string
}

export interface Packs {
    id: number
    name: string
    description: string
    category: string
    imageUrl: string
    packPrompts: Pack[]
}

export default function Home({ packs }: { packs: Packs[] }) {
    const { getToken } = useAuth()
    const [models, setModels] = useState<Model[]>([])
    const [selectedModel, setSelectedModel] = useState('')
    const [selectedPackId, setSelectedPackId] = useState<number>()
    console.log(selectedPackId)
    useEffect(() => {
        (async function fetchModels() {
            const token = await getToken()
            const response = await axios.get(`${BACKEND_URL}/api/models`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setModels(response.data.models)
        })()
    }, [getToken])

    async function handlePackGeneration() {
        const token = await getToken()
        const response = await axios.post(`${BACKEND_URL}/api/packs/generate`, {
            modelId: selectedModel,
            packId: setSelectedPackId
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data.images)
    }

    return (
        <div className="w-full bg-background p-6 md:p-8 lg:p-12">
            <div className="flex justify-between mx-auto mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-4xl font-bold">Prompt Packs</h2>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Choose from our curated collection of AI prompt packs
                    </p>
                </div>
                <Link href='/create-pack'>
                    <Button>
                        <Plus />
                        Create Pack
                    </Button>
                </Link>
            </div>

            <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packs.map((pack: Packs) => {
                    return (
                        <Card key={pack.name} className="group relative pt-0 overflow-hidden border-border/50 transition-all hover:border-primary/50">
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image
                                    src={pack.imageUrl}
                                    alt={pack.name}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
                                <Badge
                                    variant="secondary"
                                    className="absolute top-4 left-4 bg-background/50 backdrop-blur-sm"
                                >
                                    {pack.category}
                                </Badge>
                            </div>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <CardTitle>{pack.name}</CardTitle>
                                </div>
                                <CardDescription className="mt-2">{pack.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">
                                    {pack.packPrompts.length} prompts included
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Popover>
                                    <PopoverTrigger className="w-full bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 cursor-pointer rounded-md py-1">
                                        <span className="text-sm font-bold">
                                            Use Pack
                                        </span>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="text-sm pb-4 flex items-center gap-2">Select Your Model <ArrowDown size={18} /></div>
                                        <Dialog>
                                            <DialogTrigger className="w-full">
                                                {
                                                    models.map(model => {
                                                        return (
                                                            <div
                                                                key={model.id}
                                                                onClick={() => {
                                                                    setSelectedModel(model.id)
                                                                    setSelectedPackId(pack.id)
                                                                }}
                                                                className="w-full border p-2 rounded-md bg-secondary hover:bg-secondary/60 cursor-pointer flex justify-between">
                                                                {model.name}
                                                                {model.public && <Badge>Free</Badge>}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>
                                                    Generate Model using this Model?
                                                </DialogTitle>
                                                <DialogDescription>
                                                    This pack generation will take 10 credits
                                                </DialogDescription>
                                                <DialogFooter>
                                                    <Button variant='destructive'>
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        onClick={handlePackGeneration}>
                                                        Continue
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </PopoverContent>
                                </Popover>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}