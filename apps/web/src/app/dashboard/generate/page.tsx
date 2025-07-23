import Generate from '@/components/Generate'
import { BACKEND_URL } from '@/lib/config'
import { auth } from '@clerk/nextjs/server'
import axios from 'axios'

async function fetchModels() {
  const { getToken } = await auth()
  const token = await getToken()
  try {
    const response = await axios.get(`${BACKEND_URL}/api/models`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data.models
  } catch (error) {
    console.error(error)
  }
}
export default async function page() {
  const models = await fetchModels()
  return (
    <Generate
      models={models}
    />
  )
}