"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut, LogIn } from "lucide-react"
import { useSession } from "next-auth/react"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const { data: session } = useSession()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className="bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-white">IkCheatNiet</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link
                                href="/"
                                className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                href="/lookup"
                                className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Lookup
                            </Link>
                            <Link
                                href="/dashboard"
                                className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/about"
                                className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                About
                            </Link>
                        </div>
                    </div>

                    {/* User Menu */}
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {session ? (
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        {session.user?.image ? (
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src={session.user.image || "/placeholder.svg"}
                                                alt={session.user.name || "User"}
                                            />
                                        ) : (
                                            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center">
                                                <User className="h-4 w-4 text-slate-300" />
                                            </div>
                                        )}
                                        <span className="text-sm text-slate-300">{session.user?.name}</span>
                                    </div>
                                    {/* <button className="text-slate-400 hover:text-red-400 hover:bg-slate-800 p-2 rounded-md transition-colors group">
                                        <LogOut className="h-4 w-4" />
                                    </button> */}
                                    <Link href="/logout">
                                        <button className="text-slate-400 hover:text-red-400 hover:bg-slate-800 p-2 rounded-md transition-colors group">
                                            <LogOut className="h-4 w-4" />
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="flex items-center text-slate-400 hover:text-red-400 hover:bg-slate-800 p-2 rounded-md transition-colors group"
                                >
                                    <LogIn className="h-4 w-4" /> <span className="ml-2">Login</span>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-md">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800/50 backdrop-blur-lg">
                        <Link
                            href="/"
                            className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/lookup"
                            className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Lookup
                        </Link>
                        <Link
                            href="/dashboard"
                            className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/about"
                            className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>

                        {/* Mobile user section */}
                        <div className="pt-4 pb-3 border-t border-slate-700">
                            {session ? (
                                <div className="flex items-center px-3">
                                    <div className="flex items-center space-x-3">
                                        {session.user?.image ? (
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={session.user.image || "/placeholder.svg"}
                                                alt={session.user.name || "User"}
                                            />
                                        ) : (
                                            <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center">
                                                <User className="h-5 w-5 text-slate-300" />
                                            </div>
                                        )}
                                        <div>
                                            <div className="text-base font-medium text-white">{session.user?.name}</div>
                                        </div>
                                    </div>
                                    <button className="ml-auto text-slate-400 hover:text-red-400 hover:bg-slate-700 p-2 rounded-md transition-colors">
                                        <LogOut className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="flex items-center text-slate-400 hover:text-red-400 hover:bg-slate-800 p-2 rounded-md transition-colors group"
                                >
                                    <LogIn className="h-4 w-4" /> <span className="ml-2">Login</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
