"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import UploadImage from "./UploadImage";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { useAuth } from "@clerk/nextjs";

type FormData = {
    name: string;
    type:
    "man"
    | "woman"
    | "other";
    age: number;
    ethnicity:
    "white"
    | "black"
    | "asian_american"
    | "east_asian"
    | "south_east_asian"
    | "south_asian"
    | "middle_eastern"
    | "pacific"
    | "hispanic";
    eyecolor:
    "brown"
    | "blue"
    | "gray"
    | "hazel";
    bald: boolean;
};

const TrainModelForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        type: "man",
        age: 0,
        ethnicity: "white",
        eyecolor: "brown",
        bald: false,
    });
    const [url, setUrl] = useState<string>()
    const [loading, setLoading] = useState(false)
    const { getToken } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = await getToken()
        setLoading(true)
        const inputs = { ...formData, zipUrl: url }

        const response = await axios.post(`${BACKEND_URL}/api/ai/training`, inputs, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(response.data.modelId)
        setLoading(false)
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto space-y-4 p-6 rounded-2xl border">
            {/* 1st */}
            <div className="flex gap-3">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        className="mt-2"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Enter a unique username"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                        id="age"
                        type="number"
                        placeholder="Enter age"
                        value={formData.age ? formData.age : ''}
                        onChange={(e) =>
                            setFormData({ ...formData, age: parseInt(e.target.value) })
                        }
                        min={0}
                        className="transition-all duration-200 focus:ring-2 focus:ring-neutral-200 mt-2"
                        required
                    />
                </div>
            </div>

            {/* 2nd */}
            <div className="space-y-2">
                <Label>Type</Label>
                <Select
                    value={formData.type}
                    onValueChange={(value: "man" | "woman" | "other") =>
                        setFormData({ ...formData, type: value })
                    }
                >
                    <SelectTrigger className="mt-2">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="man">Man</SelectItem>
                        <SelectItem value="woman">Woman</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label>Ethnicity</Label>
                <Select
                    value={formData.ethnicity}
                    onValueChange={(value: FormData["ethnicity"]) =>
                        setFormData({ ...formData, ethnicity: value })
                    }
                >
                    <SelectTrigger className="mt-2">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="black">Black</SelectItem>
                        <SelectItem value="asian_american">Asian American</SelectItem>
                        <SelectItem value="east_asian">East Asian</SelectItem>
                        <SelectItem value="south_east_asian">South East Asian</SelectItem>
                        <SelectItem value="south_asian">South Asian</SelectItem>
                        <SelectItem value="middle_eastern">Middle Eastern</SelectItem>
                        <SelectItem value="pacific">Pacific Islander</SelectItem>
                        <SelectItem value="hispanic">Hispanic</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-3">
                <div className="space-y-2 w-full">
                    <Label>Eye Color</Label>
                    <Select
                        value={formData.eyecolor}
                        onValueChange={(value: FormData["eyecolor"]) =>
                            setFormData({ ...formData, eyecolor: value })
                        }
                    >
                        <SelectTrigger className="mt-2">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="brown">Brown</SelectItem>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="gray">Gray</SelectItem>
                            <SelectItem value="hazel">Hazel</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col justify-center gap-3 space-x-2">
                    <Label htmlFor="bald">Bald</Label>
                    <Switch
                        id="bald"
                        checked={formData.bald}
                        onCheckedChange={(checked) =>
                            setFormData({ ...formData, bald: checked })
                        }
                    />
                </div>
            </div>

            <UploadImage
                onUpload={(zipUrl) => setUrl(zipUrl)}
            />
            <Button
                disabled={!url}
                type="submit"
                className="w-full"
            >
                {
                    loading ?
                        "Submitting..." :
                        "Submit"
                }
            </Button>
        </form>
    );
};

export default TrainModelForm;