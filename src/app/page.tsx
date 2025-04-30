import { Calendar } from "lucide-react"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Coming Soon</h1>
          <p className="text-xl text-muted-foreground">
            We're working hard to bring you something amazing. Stay tuned!
          </p>
        </div>

        <div className="h-px w-full max-w-md bg-border" />
      </div>

      <div className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} IkCheatNiet. All rights reserved.
      </div>
    </div>
  )
}
