import { prisma } from "@repo/db/client"
import { Router } from "express"
import { Webhook } from "svix";

export const router = Router()

router.post('/', async (req, res) => {
    const SIGNING_SECRET = process.env.SIGNING_SECRET

    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env')
    }

    const wh = new Webhook(SIGNING_SECRET)

    const headers = req.headers
    const payload = req.body

    // Get Svix headers for verification
    const svix_id = headers['svix-id']
    const svix_timestamp = headers['svix-timestamp']
    const svix_signature = headers['svix-signature']

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return void res.status(400).json({
            success: false,
            message: 'Error: Missing svix headers',
        })
    }

    let evt: any;

    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If verification fails, error out and return error code
    try {
        evt = wh.verify(JSON.stringify(payload), {
            'svix-id': svix_id as string,
            'svix-timestamp': svix_timestamp as string,
            'svix-signature': svix_signature as string,
        })
    } catch (err) {
        console.log('Error: Could not verify webhook:', (err as Error).message)
        res.status(400).json({
            success: false,
            message: (err as Error).message,
        })
        return
    }

    const { id } = evt.data
    const eventType = evt.type
    
    try {
        switch (eventType) {
            case "user.created":
            case "user.updated": {
                const response = await prisma.user.upsert({
                    where: { clerkId: id },
                    update: {
                        username: `${evt.data.first_name ?? ""} ${evt.data.last_name ?? ""}`.trim(),
                        email: evt.data.email_addresses[0].email_address,
                        photo: evt.data.profile_image_url,
                    },
                    create: {
                        clerkId: id,
                        username: `${evt.data.first_name ?? ""} ${evt.data.last_name ?? ""}`.trim(),
                        email: evt.data.email_addresses[0].email_address,
                        photo: evt.data.profile_image_url,
                    },
                });
                break;
            }

            case "user.deleted": {
                await prisma.user.delete({
                    where: { clerkId: id },
                });
                break;
            }

            default:
                console.log(`Unhandled event type: ${eventType}`);
                break;
        }
    } catch (error) {
        console.error("Error handling webhook:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return;
    }

    return void res.status(200).json({
        success: true,
        message: 'Webhook received',
    })
})