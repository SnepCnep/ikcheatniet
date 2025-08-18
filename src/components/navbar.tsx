// components/navbar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react"

export function Navbar() {
    const { data: session } = useSession()

    console.log(session)

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                {/* Logo / Brand */}
                <Link href="/" className="text-xl font-bold tracking-tight">
                    IkCheatNiet
                </Link>

                {/* Navigation Links */}
                <div className="hidden gap-6 md:flex">
                    <Link href="/" className="hover:text-primary transition-colors">
                        Home
                    </Link>
                    <Link href="/dashboard" className="hover:text-primary transition-colors">
                        Dashboard
                    </Link>
                    <Link href="/producten" className="hover:text-primary transition-colors">
                        Producten
                    </Link>
                </div>

                {/* Call-to-Action Button */}
                <Button onClick={() => signIn("discord", { redirectTo: "/dashboard" })}>
                    Inloggen met Discord
                </Button>
            </div>
        </nav>
    );
}
