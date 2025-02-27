import { UserProfile } from '@clerk/nextjs'

export default function page() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <UserProfile />
        </div>
    )
}
