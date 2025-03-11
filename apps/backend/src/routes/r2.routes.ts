import { S3Client } from "bun"
import { Router } from "express"

export const router = Router()

router.get("/", (req, res) => {
    const key = `models/artify_${Date.now()}_${String(Math.random()).split('.')[1]}.zip`

    const preSignedUrl = S3Client.presign(key, {
        method: "PUT",
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        endpoint: process.env.ENDPOINT,
        bucket: process.env.BUCKET_NAME,
        expiresIn: 60 * 5,
        type: "application/zip"
    });

    res.json({ preSignedUrl, key })
})