import Packs from '@/components/Packs'
import { BACKEND_URL } from '@/lib/config'
import axios from 'axios'
import React from 'react'


async function getPacks() {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/packs/bulk`)
        return response.data.packs
    } catch (error) {
        console.error(error)
    }
}

export default async function page() {
    const packs = await getPacks()
    return (
        // @ts-ignore
        <Packs packs={packs} />
    )
}
