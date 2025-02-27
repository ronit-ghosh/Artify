"use client"
import { RedirectToSignIn, SignedIn, SignedOut, SignIn } from '@clerk/nextjs'

export default function Signin() {

    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Welcome Back
                        </h2>
                        <p className="text-muted-foreground">
                            Please sign in to continue
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="w-full">
                            <span>
                                <SignedOut>
                                    <SignIn fallbackRedirectUrl="/" signUpFallbackRedirectUrl="/" />
                                </SignedOut>
                                <SignedIn>
                                    <RedirectToSignIn redirectUrl={'/'} />
                                </SignedIn>
                            </span>
                        </div>
                    </div>

                    <div className="text-center text-sm">
                        <p className="text-muted-foreground">
                            By continuing, you agree to our{' '}
                            <a href="#" className="text-primary hover:underline">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-primary hover:underline">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
