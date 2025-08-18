// components/navbar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
    const { data: session, status } = useSession()
    const isAuth = status === "authenticated"

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-popover backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link href="/" className="text-xl font-bold tracking-tight text-primary">
                    IkCheatNiet
                </Link>

                <div className="hidden gap-6 md:flex">
                    <Link href="/" className="text-primary transition-colors">
                        Home
                    </Link>
                    {isAuth && (
                        <Link href="/dashboard" className="text-primary transition-colors">
                            Dashboard
                        </Link>
                    )}
                    <Link href="/team" className="text-primary transition-colors">
                        Team
                    </Link>
                    <Link href="/partners" className="text-primary transition-colors">
                        Partners
                    </Link>
                </div>

                {isAuth ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User Avatar"} />
                                <AvatarFallback>{session?.user?.name?.charAt(0) || "?"}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="text-white border">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                        <Button
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={() => signIn("discord", { redirectTo: "/dashboard" })}
                        >
                        Login
                    </Button>
                )}
            </div>
        </nav>
    );
}

