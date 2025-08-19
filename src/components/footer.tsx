// components/footer.tsx
import { Separator } from "@/components/ui/separator"
import { Github } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side */}
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ik Cheat Niet. All rights reserved.
          </div>

          {/* Right side (links / socials) */}
          <div className="flex items-center gap-4">
            <Link 
              href="/privacy" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <Link 
              href="/terms" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </Link>

            {/* Social icons */}
            <Link 
              href="https://github.com/SnepCnep/ikcheatniet" 
              target="_blank" 
              className="text-muted-foreground hover:text-primary"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
