"use client"
import { useEffect, useState } from 'react';
// import { Settings, Play } from 'lucide-react';
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';
// import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { Dialog } from '@radix-ui/react-dialog';
import Image from 'next/image';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/config';
import { useAuth } from '@clerk/nextjs';
import { Skeleton } from './ui/skeleton';
import { Textarea } from './ui/textarea';

export interface Model {
    id: string;
    name: string;
    type: "man" | "woman" | "other";
    age: number;
    ethnicity: string;
    eyecolor: string;
    bald: boolean;
    tensorPath: string;
    triggerWord: string;
    status: "generated" | "pending" | "failed";
    falAiReqId: string | null;
    userId: string;
    zipUrl: string;
    thumbnail: string;
    public: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function Generate(props: {
    models: Model[]
}) {
    const { models } = props
    const [prompt, setPrompt] = useState('');
    // const [customTensorpath, setCustomTensorpath] = useState('');
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [falReqId, setFalReqId] = useState('')
    const [imageLoading, setImageLoading] = useState(false)
    const [imageStatus, setImageStatus] = useState('pending')
    const [imageUrl, setImageUrl] = useState('')
    const [isDownloading, setIsDownloading] = useState(false)
    const { getToken } = useAuth()

    async function handleGenerateImage() {
        setImageLoading(true)
        setImageUrl('');  
        setImageStatus('pending');
        const token = await getToken()
        try {

            const response = await axios.post(`${BACKEND_URL}/api/ai/generate`, {
                prompt,
                modelId: selectedCard
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setFalReqId(response.data.request_id)
        } catch (error) {
            setImageLoading(false)
            console.error(error)
        }
    }

    async function fetchImage() {
        const token = await getToken()
        try {
            setImageStatus('Pending')
            setImageLoading(true)
            const res = await axios.get(`${BACKEND_URL}/api/images/status/${falReqId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.data.status == 'failed') {
                setImageLoading(false)
                setImageStatus('failed')
                return
            }
            setImageStatus(res.data.status)
            if (res.data.imageUrl) {
                setImageUrl(res.data.imageUrl)
                setImageLoading(false)
            }
        } catch (error) {
            setImageStatus('failed')
            setImageLoading(false)
            console.error(error)
        }
    }

    useEffect(() => {
        if (!falReqId || imageUrl) return;

        const interval = setInterval(() => {
            fetchImage();
        }, 1000);

        return () => clearInterval(interval);

    }, [falReqId, imageUrl])

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

    return (
        <div className="min-h-screen w-full p-6">
            <div className="max-w-7xl mx-auto">
                <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6`}>

                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold mb-4">Models</h2>
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
                            {models.map((model) => (
                                <div
                                    key={model.id}
                                    className={`rounded-lg p-4 border max-w-sm cursor-pointer transition-all 
                                        ${selectedCard === model.id ? 'ring-2 ring-blue-500' : ''}`}
                                    onClick={() => setSelectedCard(model.id)}
                                >
                                    {model.public &&
                                        <Badge
                                            variant='secondary'
                                            className='absolute top-6 left-6'>
                                            Free
                                        </Badge>}
                                    <Image
                                        src={model.thumbnail}
                                        alt={model.name}
                                        width={1000}
                                        height={1000}
                                        className="w-full h-56 object-cover rounded-md mb-3"
                                    />
                                    <h3 className="text-lg font-semibold">{model.name}</h3>
                                    <p className="text-neutral-400 text-sm">This is a model trained with {model.name}&apos;s Face</p>
                                </div>
                            ))}

                        </div>
                        <Textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Enter your prompt here..."
                            className="w-full h-26 rounded-md p-3 resize-none"
                        />
                        <div className="mt-4 flex justify-end gap-3">
                            <Button
                                disabled={imageLoading || !prompt}
                                variant="outline"
                                onClick={() => setPrompt('')}
                            >
                                Reset
                            </Button>
                            <Button
                                disabled={imageLoading || !selectedCard || !prompt}
                                onClick={handleGenerateImage}>
                                {/* <Play className="h-4 w-4 mr-2" /> */}
                                {imageLoading ? "Generating..." : "Run"}
                            </Button>
                        </div>
                        {/* Custom tensorpath input */}
                        {/* <div className="bg-neutral-900 rounded-lg overflow-hidden">
                            <Accordion type="single" collapsible>
                                <AccordionItem value="prompt">
                                    <AccordionTrigger className="px-4">
                                        <div className="flex items-center gap-2">
                                            <Settings className="h-5 w-5" />
                                            <span className="font-medium">Custom Settings</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4">
                                        <Input
                                            value={customTensorpath}
                                            onChange={(e) => setCustomTensorpath(e.target.value)}
                                            placeholder="Enter your tensorpath here..."
                                            className="w-full h-12 bg-neutral-800 rounded-md p-3"
                                        />
                                        <div className="mt-4 flex justify-end gap-3">
                                            <Button
                                                variant="outline"
                                                onClick={() => setCustomTensorpath('')}
                                            >
                                                Reset
                                            </Button>
                                            <Button>
                                                <Play className="h-4 w-4 mr-2" />
                                                Run
                                            </Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div> */}

                    </div>

                    <div className={`border rounded-lg p-4 max-h-md`}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Result</h2>
                            <Badge className='capitalize'>{imageStatus}</Badge>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild className='cursor-pointer'>
                                {imageLoading ?
                                    <Skeleton
                                        className='h-96 w-full z-50'
                                    /> :

                                    <Image
                                        src={imageUrl || 'https://res.cloudinary.com/drynqkitl/image/upload/v1740401356/gray_rpdoj8.png'}
                                        alt='image'
                                        width={1000}
                                        height={1000}
                                        className='object-cover rounded-md'
                                    />
                                }
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle className='w-full flex justify-end px-4'>
                                    <Button
                                        onClick={() => handleDownload(imageUrl)}>
                                        {isDownloading ? 'Downloading...' : 'Download'}
                                    </Button>
                                </DialogTitle>
                                <Image
                                    src={imageUrl || 'https://res.cloudinary.com/drynqkitl/image/upload/v1740401356/gray_rpdoj8.png'}
                                    alt={'image'}
                                    width={1000}
                                    height={1000}
                                    className="w-full object-cover rounded-md mb-3"
                                />
                            </DialogContent>
                        </Dialog>
                        <div className="mt-4 text-sm text-neutral-400">
                            <p>Your request will cost 1 credit per operation.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}
