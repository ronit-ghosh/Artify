import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(403).json({ msg: "Invalid Auth Header!" });
        return
    }
    const token = authHeader.split(' ')[1]

    const clerkPublicKey = process.env.JWT_SECRET
    if (!clerkPublicKey) {
        console.error("CLERK_JWT_PUBLIC_KEY is missing in enviromental variables!")
        res.status(403).json({ msg: "Server error!" })
        return
    }

    const JWT_SECRET = clerkPublicKey.replace(/\\n/g, "\n")
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET, {
            algorithms: ["RS256"],
            issuer:
                process.env.CLERK_ISSUER || "https://clerk.ronitghosh.site",
            complete: true,
        })

        if (typeof decoded.payload.sub !== 'string') {
            res.status(403).json({ msg: "Wrong Auth Header!" })
            return
        }
        
        req.userId = decoded.payload.sub

        next()
    } catch (error) {
        res.status(411).json({ msg: "Something went wrong!" })
        console.error(error)
        return
    }
}