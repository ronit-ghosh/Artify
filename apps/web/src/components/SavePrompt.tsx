"use client"
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function SavePrompt() {
    const [prompt, setPrompt] = useState<string>()
    const [savedPrompts, setSavedPrompts] = useState<string[]>([])

    const handleSavePrompt = (e: React.FormEvent) => {
        e.preventDefault()
        if (!prompt) return
        const updatedPrompt = [...savedPrompts, prompt]
        setSavedPrompts(updatedPrompt)

        localStorage.setItem('artify-prompts', JSON.stringify(updatedPrompt))
        setPrompt('')
    }

    useEffect(() => {
        const existingPrompts = localStorage.getItem('artify-prompts')
        if (existingPrompts) {
            setSavedPrompts(JSON.parse(existingPrompts))
        }
    }, [])

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast("Copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy: ", err);
            toast("Failed to copy to clipboard.");
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card className="p-6 bg-card border-border">
                    <h2 className="text-xl font-semibold mb-4">Saved Prompt</h2>
                    <div className="space-y-4">
                        {savedPrompts.length === 0 &&
                            <div className="text-sm text-neutral-500 grid place-items-center">
                                No Saved Prompts
                            </div>}
                        {savedPrompts.map((prompt, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 rounded-lg bg-muted"
                            >
                                <div>
                                    <h3 className="font-medium text-foreground">{prompt}</h3>
                                </div>
                                <div
                                    onClick={() => handleCopy(prompt)}
                                    className="cursor-pointer"
                                    aria-label={`Copy ${prompt}`}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            handleCopy(prompt);
                                        }
                                    }}
                                >
                                    <Copy />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <div>
                <Card className="p-6 bg-card border-border">
                    <form onSubmit={handleSavePrompt}>
                        <h2 className="text-xl font-semibold mb-4">Save prompt for later</h2>
                        <div className="space-y-4">
                            <Input
                                placeholder="Enter your prompt here..."
                                className=" bg-muted border-input resize-none"
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                            <Button
                                type="submit"
                                className="w-full">
                                Save Prompt
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}
