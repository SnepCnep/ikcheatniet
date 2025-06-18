import { auth } from "@/lib/auth"
import { getBlacklistDetails } from "@/lib/user"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Calendar, Shield, User, EyeOff, Settings } from "lucide-react"
import Link from "next/link"

export default async function Blacklisted() {
  const session = await auth()

  if (!session || !session.user) {
    return redirect("/")
  }

  const blacklistDetails = await getBlacklistDetails(session.user.id || "")

  if (!blacklistDetails) {
    return redirect("/")
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const isSelfBlacklisted = !blacklistDetails.byAdmin

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {isSelfBlacklisted && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200">Service Unavailable</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  You have blacklisted yourself and cannot access any platform features. Other users cannot find or
                  contact you.
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div
              className={`rounded-full p-3 ${
                isSelfBlacklisted ? "bg-blue-100 dark:bg-blue-900/30" : "bg-red-100 dark:bg-red-900/30"
              }`}
            >
              {isSelfBlacklisted ? (
                <EyeOff
                  className={`h-8 w-8 ${
                    isSelfBlacklisted ? "text-blue-600 dark:text-blue-400" : "text-red-600 dark:text-red-400"
                  }`}
                />
              ) : (
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
              )}
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {isSelfBlacklisted ? "Account Deactivated" : "Account Suspended"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isSelfBlacklisted
              ? "You have blacklisted yourself and cannot use our services"
              : "Your account has been temporarily suspended"}
          </p>
        </div>

        <Card
          className={`${
            isSelfBlacklisted ? "border-blue-200 dark:border-blue-800" : "border-red-200 dark:border-red-800"
          } dark:bg-gray-900`}
        >
          <CardHeader className="pb-4">
            <CardTitle
              className={`flex items-center gap-2 ${
                isSelfBlacklisted ? "text-blue-700 dark:text-blue-300" : "text-red-700 dark:text-red-300"
              }`}
            >
              {isSelfBlacklisted ? (
                <>
                  <EyeOff className="h-5 w-5" />
                  Self-Blacklist Status
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  Suspension Details
                </>
              )}
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              {isSelfBlacklisted
                ? "You have chosen to blacklist yourself from our platform"
                : "Information about your account suspension"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div
                className={`flex items-start gap-3 p-3 rounded-lg ${
                  isSelfBlacklisted ? "bg-blue-50 dark:bg-blue-950/30" : "bg-red-50 dark:bg-red-950/30"
                }`}
              >
                {isSelfBlacklisted ? (
                  <EyeOff className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                )}
                <div className="space-y-1">
                  <p
                    className={`font-medium ${
                      isSelfBlacklisted ? "text-blue-900 dark:text-blue-100" : "text-red-900 dark:text-red-100"
                    }`}
                  >
                    {isSelfBlacklisted ? "Self-Blacklist Reason" : "Reason for Suspension"}
                  </p>
                  <p
                    className={`${
                      isSelfBlacklisted ? "text-blue-700 dark:text-blue-300" : "text-red-700 dark:text-red-300"
                    }`}
                  >
                    {blacklistDetails.reason}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-b dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {isSelfBlacklisted ? "Privacy Enabled On" : "Suspended On"}
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(blacklistDetails.createdAt)}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {isSelfBlacklisted ? "Set By" : "Suspended By"}
                  </span>
                </div>
                <Badge
                  variant={isSelfBlacklisted ? "outline" : blacklistDetails.byAdmin ? "destructive" : "secondary"}
                  className="dark:border-gray-600"
                >
                  {isSelfBlacklisted ? "You" : blacklistDetails.byAdmin ? "Administrator" : "System"}
                </Badge>
              </div>

              {blacklistDetails.updatedAt && blacklistDetails.updatedAt > blacklistDetails.createdAt && (
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Updated</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(blacklistDetails.updatedAt)}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="dark:text-gray-100">
              {isSelfBlacklisted ? "Privacy Information" : "What happens next?"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isSelfBlacklisted ? (
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-1 mt-1">
                    <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full" />
                  </div>
                  <div>
                    <p className="font-medium dark:text-gray-100">Service Access Blocked</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      You cannot use our services while you have blacklisted yourself. All platform features are
                      disabled.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="rounded-full bg-orange-100 dark:bg-orange-900/30 p-1 mt-1">
                    <div className="w-2 h-2 bg-orange-600 dark:bg-orange-400 rounded-full" />
                  </div>
                  <div>
                    <p className="font-medium dark:text-gray-100">Hidden from Search</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Other users cannot find, view, or interact with your profile in any way.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-1 mt-1">
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  </div>
                  <div>
                    <p className="font-medium dark:text-gray-100">Self-Imposed Restriction</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      You chose to blacklist yourself. You can't remove this restriction.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-1 mt-1">
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  </div>
                  <div>
                    <p className="font-medium dark:text-gray-100">Review Process</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Our team will review your case if you believe this suspension was made in error.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-1 mt-1">
                    <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full" />
                  </div>
                  <div>
                    <p className="font-medium dark:text-gray-100">Contact Support</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Reach out to our support team for assistance or to appeal this decision.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {isSelfBlacklisted ? (
            <>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/settings/remove-blacklist">
                  <Settings className="h-4 w-4 mr-2" />
                  Remove Self-Blacklist
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/help">Need Help?</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="outline">
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/appeal">Submit Appeal</Link>
              </Button>
            </>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isSelfBlacklisted ? "Privacy" : "Suspension"} ID:{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">{blacklistDetails.id}</code>
          </p>
        </div>
      </div>
    </main>
  )
}
