"use client"

import { BACKEND_URL, CLOUDFLARE_URL } from '@/lib/config'
import { Label } from './ui/label'
import JSZip from "jszip"
import axios from "axios"
import { CircleCheckBig, UploadCloudIcon } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'

interface OnUpload {
    onUpload: (zipUrl: string) => void
}

export default function UploadImage({ onUpload }: OnUpload) {
    const [uploaded, setUploaded] = useState(false)
    const [hasUploaded, setHasUploaded] = useState(false)
    const { getToken } = useAuth()

    async function handleImageChange() {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/*"
        input.multiple = true

        input.onchange = async () => {
            const zip = new JSZip()
            const token = await getToken()
            try {
                setUploaded(true)
                const response = await axios.get(`${BACKEND_URL}/api/pre-signed-url`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                const preSignedUrl = response.data.preSignedUrl
                const key = response.data.key

                if (!input || !input.files) return

                for (const file of input.files) {
                    const images = await file.arrayBuffer()
                    zip.file(file.name, images)
                }
                const content = await zip.generateAsync({ type: "blob" })
                const formData = new FormData()
                formData.append("file", content)

                await axios.put(preSignedUrl, content)
                onUpload(`${CLOUDFLARE_URL}/${key}`)
                setHasUploaded(true)
                setUploaded(false)
            } catch (error) {
                console.error(error)
            }
        }
        input.click()
    }

    return (
        <div>
            <Label htmlFor="image">Upload Image</Label>
            <button
                id='image'
                type='button'
                onClick={handleImageChange}
                className="w-full h-32 border-2 border-dashed border-neutral-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-secondary duration-200 mt-2 hover:scale-105 transition-transform">
                <div className="text-neutral-500 flex gap-3 items-center">
                    {
                        hasUploaded ?
                            <CircleCheckBig /> :
                            <UploadCloudIcon />
                    }
                    {
                        hasUploaded ?
                            "Uploaded" :
                            uploaded ?
                                "Uploading..." :
                                "Add atleast 4 photos"
                    }
                </div>
            </button>
        </div>
    )
}
