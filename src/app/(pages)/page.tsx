import { Shield, Users, Search, AlertTriangle } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            IkCheatNiet.nl
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Protecting gaming communities by tracking and identifying cheaters across FiveM servers.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community Protection</h3>
            <p className="text-muted-foreground">
              We help server administrators identify and prevent cheaters from disrupting your gaming experience.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <Search className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Discord ID Lookup</h3>
            <p className="text-muted-foreground">
              Search player histories using Discord IDs to check reputation and previous infractions across servers.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Server Network</h3>
            <p className="text-muted-foreground">
              Connected with multiple FiveM servers to maintain a comprehensive database of player behavior.
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About IkCheatNiet</h2>
            <p className="text-lg text-muted-foreground mb-6">
              IkCheatNiet.nl is a community-driven platform dedicated to maintaining fair play in FiveM gaming servers.
              Our database tracks player behavior and helps server administrators make informed decisions about player
              access.
            </p>
            <div className="flex items-center justify-center gap-2 text-amber-500">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm">Always verify information and follow your server&#39;s policies</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-muted-foreground">Players Tracked</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Connected Servers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Monitoring</div>
          </div>
        </div>
      </main>
    </div>
  )
}
