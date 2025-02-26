"use client"
import { useState } from 'react';
import { Settings, Play } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { DialogTrigger } from './ui/dialog';
import { Dialog } from '@radix-ui/react-dialog';
import Image from 'next/image';
import axios from 'axios';
import { BACKEND_URL } from '@/lib/config';
import { useAuth } from '@clerk/nextjs';

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
    const [customTensorpath, setCustomTensorpath] = useState('');
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const { getToken } = useAuth()

    async function handleGenerateImage() {
        const token = await getToken()
        const response = await axios.post(`${BACKEND_URL}/api/ai/generate`, {
            prompt,
            modelId: selectedCard
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data)
    }

    return (
        <div className="min-h-screen w-full p-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold mb-4">Models</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {models.map((model) => (
                                <div
                                    key={model.id}
                                    className={`relative bg-neutral-900 rounded-lg p-4 cursor-pointer transition-all ${selectedCard === model.id ? 'ring-2 ring-blue-500' : ''
                                        }`}
                                    onClick={() => setSelectedCard(model.id)}
                                >
                                    {model.public &&
                                        <Badge
                                            variant='secondary'
                                            className='absolute top-6 left-6'>
                                            Free
                                        </Badge>}
                                    <img
                                        src={model.thumbnail}
                                        alt={model.name}
                                        className="w-full h-56 object-cover rounded-md mb-3"
                                    />

                                    <h3 className="text-lg font-semibold">{model.name}</h3>
                                    <p className="text-neutral-400 text-sm">This is a model trained with {model.name}&apos; Face</p>
                                </div>
                            ))}
                        </div>
                        <Input
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Enter your prompt here..."
                            className="w-full h-12 bg-neutral-800 rounded-md p-3"
                        />
                        <div className="mt-4 flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setPrompt('')}
                            >
                                Reset
                            </Button>
                            <Button
                                onClick={handleGenerateImage}>
                                <Play className="h-4 w-4 mr-2" />
                                Run
                            </Button>
                        </div>

                        <div className="bg-neutral-900 rounded-lg overflow-hidden">
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
                        </div>
                    </div>
                    <div className="bg-neutral-900 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Result</h2>
                            <Badge>Idle</Badge>
                        </div>
                        <Dialog>
                            <DialogTrigger>
                                <Image
                                    src={models[0]?.thumbnail || ''}
                                    alt='image'
                                    width={1000}
                                    height={1000}
                                    className='object-cover rounded-md'
                                />
                            </DialogTrigger>
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
