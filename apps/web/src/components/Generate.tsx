"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendHorizonal } from "lucide-react";

export default function Generate() {
    const [prompt, setPrompt] = useState("");

    return (
        <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4">
            <div className="mb-8">
                <Avatar className="h-24 w-24 border-8 border-primary/10 animate-pulse">
                    <AvatarImage src="https://res.cloudinary.com/drynqkitl/image/upload/v1740221612/Artify_uda5oc.png" />
                    <AvatarFallback className="bg-muted">AI</AvatarFallback>
                </Avatar>
            </div>

            <Card className="w-full max-w-3xl bg-secondary backdrop-blur-sm border-border/50">
                <div className="relative">
                    <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Type your prompt"
                        className=" bg-transparent border-0 focus-visible:ring-0 text-2xl resize-none p-6 pr-16"
                    />
                    <Button
                        size="icon"
                        className="absolute right-4 bottom-4 rounded-xl w-12 h-10"
                        variant="default"
                    >
                        <SendHorizonal />
                    </Button>
                </div>
            </Card>
        </div>
    );
}