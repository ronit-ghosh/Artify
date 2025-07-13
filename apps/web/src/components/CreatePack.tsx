"use client"

import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import axios from 'axios';
import { BACKEND_URL } from '@/lib/config';
import { useAuth } from '@clerk/nextjs';

interface Prompt {
    name?: string
    prompt?: string
}

interface FormData {
    name: string;
    description: string;
    category: string;
    imageUrl: string;
    prompts: Prompt[];
}

export default function CreatePack() {
    const { getToken } = useAuth()
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        category: '',
        imageUrl: '',
        prompts: [{
            name: '',
            prompt: ''
        }]
    });
    const [loading, setLoading] = useState(false)
    const [packId, setPackId] = useState<number>()
    
    const addPromptField = () => {
        setFormData(prev => ({
            ...prev,
            prompts: [...prev.prompts, {
                name: '',
                prompt: ''
            }]
        }));
    };

    const updatePrompt = (index: number, field: 'name' | 'prompt', value: string) => {
        const newPrompts = [...formData.prompts];
        newPrompts[index] = {
            ...newPrompts[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            prompts: newPrompts
        }));
    };

    const handleFormSubmit = async () => {
        const token = await getToken()
        setLoading(true)
        try {
            const response = await axios.post(`${BACKEND_URL}/api/packs/create`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setPackId(response.data.packId.id)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-background p-8">
            <div className='mb-10'>
                <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-4xl font-bold">Create Packs</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                    Create your customised packs
                </p>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Pack name"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Pack description"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={formData.category}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="seasonal">Seasonal</SelectItem>
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="creative">Creative</SelectItem>
                                <SelectItem value="personal">Personal</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                            id="image"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                            placeholder="Image URL"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Prompts</Label>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={addPromptField}
                                className="flex items-center gap-2"
                            >
                                <PlusCircle className="h-4 w-4" />
                                Add Prompt
                            </Button>
                        </div>
                        {formData.prompts.map((prompt, index) => (
                            <div key={index} className="space-y-2">
                                <Label htmlFor={`prompt-${index}`}>Prompt {index + 1} Name</Label>
                                <Input
                                    id={`prompt-${index}`}
                                    value={prompt.name}
                                    onChange={(e) => updatePrompt(index, 'name', e.target.value)}
                                    placeholder="Enter prompt name"
                                />
                                <Label htmlFor={`prompt-${index}`}>Prompt {index + 1}</Label>
                                <Input
                                    id={`prompt-${index}`}
                                    value={prompt.prompt}
                                    onChange={(e) => updatePrompt(index, 'prompt', e.target.value)}
                                    placeholder="Enter prompt"
                                />
                            </div>
                        ))}
                        <Button
                            onClick={handleFormSubmit}
                            disabled={!formData.category || !formData.description || !formData.imageUrl || !formData.name || !formData.prompts}
                            className='w-full'>
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </div>

                {/* Preview Card Section */}
                <div className="flex items-start justify-center pt-8">
                    <Card className="group relative pt-0 overflow-hidden border-border/50 transition-all hover:border-primary/50 w-full max-w-md">
                        <div className="relative h-48 w-full overflow-hidden">
                            <div
                                style={{
                                    backgroundImage: `url(${formData.imageUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    transition: 'transform 0.3s ease',
                                }}
                                className="group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
                            {formData.category && (
                                <Badge
                                    variant="secondary"
                                    className="absolute top-4 left-4 bg-background/50 backdrop-blur-sm"
                                >
                                    {formData.category}
                                </Badge>
                            )}
                        </div>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <CardTitle>{formData.name || "Pack Name"}</CardTitle>
                            </div>
                            <CardDescription className="mt-2">
                                {formData.description || "Pack description"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">
                                {formData.prompts.length} prompts included
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant='ghost' className="w-full">
                                Pack Preview
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
