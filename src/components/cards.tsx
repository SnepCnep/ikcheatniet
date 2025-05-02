import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "motion/react"
import { Shield, Users, Database, Search } from "lucide-react"
import { NumberTicker } from "@/components/magicui/number-ticker"

export interface CardsProps {
  totalCheaters?: number
  lastUpdate?: number
}

export function Cards({ totalCheaters, lastUpdate }: CardsProps) {
  const stats = {
    totalCheaters: totalCheaters || 24783,
    lastUpdate: lastUpdate || Date.now(),
    databaseSize: '1.2',
    servers: 100
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <Card className="bg-white rounded-xl shadow-xl border-gray-100">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Shield className="mr-2 h-5 w-5 text-red-500" />
            Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NumberTicker
            value={stats.totalCheaters}
            className="text-3xl font-bold"
          />
          <CardDescription className="text-zinc-800">
            Total flagged accounts
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-xl shadow-xl border-gray-100">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Search className="mr-2 h-5 w-5 text-yellow-500" />
            Servers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex">
            <NumberTicker
              value={stats?.servers || 0}
              className="text-3xl font-bold"
            />
            <h1 className="font-bold text-xl mt-[4px]">+</h1>
          </div>
          <CardDescription className="text-zinc-800">
            Monitored game servers
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-xl shadow-xl border-gray-100">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Users className="mr-2 h-5 w-5 text-blue-500" />
            Last Update
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">
            {new Date(stats.lastUpdate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <CardDescription className="text-zinc-800 mt-2">
            Latest database sync
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-xl shadow-xl border-gray-100">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Database className="mr-2 h-5 w-5 text-green-500" />
            Database
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex">
            <NumberTicker
              value={
                parseFloat(stats.databaseSize || "0").toFixed
                  ? parseFloat(parseFloat(stats.databaseSize).toFixed(1))
                  : 0
              }
              decimalPlaces={1}
              className="text-3xl font-bold"
            />
            <h1 className="font-bold text-xl mt-[7px]">GB</h1>
          </div>
          <CardDescription className="text-zinc-800">
            Total data stored
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}