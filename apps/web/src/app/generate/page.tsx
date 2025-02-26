import Generate from '@/components/Generate'
import { BACKEND_URL } from '@/lib/config'
import { auth } from '@clerk/nextjs/server'
import axios from 'axios'

async function fetchModels() {
  const { getToken } = await auth()
  const token = await getToken()
  const response = await axios.get(`${BACKEND_URL}/api/models`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data.models
}
export default async function page() {
  const models = await fetchModels()
  return (
    <Generate
      models={models}
    />
  )
}


// [
//   {
//       "id": "e03559e0-f314-41fb-af15-c55c2ce88dd3",
//       "name": "Samay Raina",
//       "type": "man",
//       "age": 27,
//       "ethnicity": "south_asian",
//       "eyecolor": "brown",
//       "bald": false,
//       "tensorPath": "https://v3.fal.media/files/penguin/Y2m-tCvpeDtavhpCiexpx_pytorch_lora_weights.safetensors",
//       "triggerWord": "samayraina",
//       "status": "generated",
//       "falAiReqId": null,
//       "userId": "samayraina",
//       "zipUrl": "https://pub-66db4db1df6146b2a0d8cbe8012f60fe.r2.dev/models/artify_1740555329926_8153734942112794.zip",
//       "thumbnail": "https://pub-66db4db1df6146b2a0d8cbe8012f60fe.r2.dev/2.jpg",
//       "public": true,
//       "createdAt": "2025-02-21T12:15:05.579Z",
//       "updatedAt": "2025-02-21T12:15:05.579Z"
//   }
// ]