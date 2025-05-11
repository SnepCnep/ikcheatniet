import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Types
import { NextRequest } from "next/server"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isRequestAuth(req: NextRequest): boolean {
    const referer = req.headers.get('referer') || req.headers.get('origin');
    const origin = req.credentials === 'same-origin'

    if (!referer || !origin) {
        return false
    }

    return true
}