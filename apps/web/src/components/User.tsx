import { useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function User() {
    const { user } = useUser()
    if (!user) return <div></div>
    const fullname = user.firstName + " " + user.lastName

    return (
        <>
            <Avatar>
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>{user.firstName}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="font-bold text-sm">{fullname}</span>
                <span className="text-xs font-thin">{user.emailAddresses[0]?.emailAddress}</span>
            </div>
        </>
    )
}