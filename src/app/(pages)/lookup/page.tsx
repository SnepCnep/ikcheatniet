import { Search, Clock } from "lucide-react"

export default function LookupPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <Search className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4">Cheater Lookup</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Advanced Discord ID lookup system for identifying known cheaters and protecting your gaming community
            </p>

            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full mb-8">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Coming Soon</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
