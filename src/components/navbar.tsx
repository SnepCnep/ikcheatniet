"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
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
import ModeToggle from "@/components/thema-switch"

export function Navbar() {
    const { data: session, status } = useSession()

    const isAuth = status === "authenticated"
    const isNotUser = session?.user?.role !== "user"

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                {/* Logo / Brand */}
                <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
                    IkCheatNiet
                </Link>

                {/* Navigation Links */}
                <div className="hidden gap-6 md:flex">
                    <Link href="/" className="text-foreground hover:text-primary transition-colors">
                        Home
                    </Link>
                    {isAuth ? (
                        <Link href="/lookup" className="text-foreground hover:text-primary transition-colors">
                            Lookup
                        </Link>
                    ) : (
                        <Link href="#" onClick={() => signIn("discord", { redirectTo: "/lookup" })} className="text-foreground hover:text-primary transition-colors">
                            Lookup
                        </Link>
                    )}
                    <Link href="/team" className="text-foreground hover:text-primary transition-colors">
                        Team
                    </Link>
                    <Link href="/partners" className="text-foreground hover:text-primary transition-colors">
                        Partners
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {/* <ModeToggle /> */}
                    {isAuth ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="p-0 rounded-full">
                                    <Avatar>
                                        <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User Avatar"} />
                                        <AvatarFallback>
                                            {session?.user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "?"}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    {session?.user?.name || "My Account"}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile">Profile</Link>
                                </DropdownMenuItem>
                                {isNotUser && (
                                    <DropdownMenuItem asChild>
                                        <Link href="/admindash">Admin Dashboard</Link>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button onClick={() => signIn("discord", { redirectTo: "/lookup" })}>
                            Login
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    )
}
