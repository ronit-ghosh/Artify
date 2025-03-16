import { BACKEND_URL } from '@/lib/config'
import { useAuth } from '@clerk/nextjs'
import axios from 'axios'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Skeleton } from './ui/skeleton'

interface ModelStatus {
    id: string
    name: string
    thumbnail: string
    tensorPath: string
    status: "pending"
    | "generated"
    | "failed"
}

export default function ModelCard({ falReqId }: { falReqId: string }) {
    const [data, setData] = useState<ModelStatus>({
        id: '',
        name: '',
        status: 'pending',
        tensorPath: '',
        thumbnail: ''
    })
    const [, setLoading] = useState(true)
    const { getToken } = useAuth()

    const fetchModel = useCallback(async () => {
        setLoading(true)
        const token = await getToken()
        try {
            const response = await axios.get(`${BACKEND_URL}/api/models/status/${falReqId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setData(response.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }, [falReqId, getToken])

    useEffect(() => {
        if (!falReqId || data.tensorPath) return

        const interval = setInterval(() => {
            fetchModel()
        }, 3000)

        return () => clearInterval(interval)

    }, [falReqId, data.tensorPath, fetchModel])

    if (falReqId === '') return
    return (
        <div className="relative border w-full h-96 rounded-lg p-4 max-w-sm cursor-pointer transition-all">
            {data.tensorPath === '' ? <Skeleton className='w-full h-full' /> :
                <>
                    <Badge className='capitalize absolute top-6 right-6'>{data?.status}</Badge>
                    <Image
                        src={data?.thumbnail || 'https://res.cloudinary.com/drynqkitl/image/upload/v1740401356/gray_rpdoj8.png'}
                        alt='Model'
                        width={1000}
                        height={1000}
                        className="w-full h-56 object-cover rounded-md mb-3"
                    />
                    <h3 className="text-lg font-semibold">{data?.name}</h3>
                    <p className="text-neutral-400 text-sm">This is a model trained with {data?.name}&apos;s Face</p>
                </>
            }
        </div>
    )
}
