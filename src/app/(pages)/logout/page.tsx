import { signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function LogoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-slate-700 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 bg-slate-800/80 backdrop-blur-lg border-slate-700/50 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-lg">
            <LogOut className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Sign Out</CardTitle>
          <CardDescription className="text-slate-400">
            Are you sure you want to sign out of your account?
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}
            >
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </Button>
            </form>

            <Link href="/dashboard" className="block">
              <Button
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-3"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-500">You'll be redirected to the home page after signing out</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}