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

export function Navbar() {
  const { data: session, status } = useSession()

  const isAuth = status === "authenticated"

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
          {isAuth && (
            <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
          )}
          <Link href="/team" className="text-foreground hover:text-primary transition-colors">
            Team
          </Link>
          <Link href="/partners" className="text-foreground hover:text-primary transition-colors">
            Partners
          </Link>
        </div>

        {/* Call-to-Action Button */}
        {isAuth ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User Avatar"} />
                <AvatarFallback>{session?.user?.name?.charAt(0) || "?"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => signIn("discord", { redirectTo: "/dashboard" })}>Login</Button>
        )}
      </div>
    </nav>
  )
}
