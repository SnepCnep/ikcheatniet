import { Github, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Main Title */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight">I Don&#39;t Cheat</h1>
          <p className="text-lg md:text-xl text-slate-300">
            The lookup database for FiveM cheats AKA (IkCheatNiet.nl)
          </p>
          <div className="space-y-2">
            <p className="text-2xl md:text-3xl text-purple-300 font-semibold">Coming Soon</p>
            <p className="text-lg md:text-xl text-slate-300">Working on v2</p>
          </div>
        </div>

        {/* Status Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-2 text-white">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-lg font-medium">Development in Progress</span>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Get in Touch</h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* GitHub */}
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm w-full sm:w-auto"
              asChild
            >
              <a href="https://github.com/SnepCnep/ikcheatniet" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </Button>

            {/* Discord */}
            {/* <Button
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm w-full sm:w-auto"
              asChild
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              <a href="https://discord.gg/ikcheatniet" target="_blank" rel="noopener noreferrer">
                Join our Discord
              </a>
            </Button> */}
          </div>

        </div>

        {/* Footer */}
        <div className="pt-8 text-slate-400 text-sm">
          <p>&copy; 2024 I Don&#39;t Cheat. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
