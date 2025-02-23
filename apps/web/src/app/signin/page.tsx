import { Button } from '@/components/ui/button'
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'

export default function page() {
    return (
        <div className='h-screen w-full flex justify-center items-center'>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
        </div>
    )
}
