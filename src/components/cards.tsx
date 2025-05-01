
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { motion } from "motion/react"
// import { Shield, Users, Database, Search } from "lucide-react"
// import { NumberTicker } from "@/components/magicui/number-ticker"

// export function Cards() {
//     const stats = {
//         totalCheaters: 24783,
//         activeBans: 18452,
//         recentDetections: 342,
//         databaseSize: "1.2 GB",
//     }

//     return (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4, duration: 0.5 }}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
//         >
//           <Card className="bg-white rounded-xl shadow-xl border-gray-100">
//             <CardHeader>
//               <CardTitle className="text-lg flex items-center">
//                 <Shield className="mr-2 h-5 w-5 text-red-500" />
//                 Cheaters
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <NumberTicker className="text-3xl font-bold">{stats.totalCheaters.toLocaleString()}</NumberTicker>
//               <CardDescription className="text-zinc-800">Identified and logged in our database</CardDescription>
//             </CardContent>
//           </Card>

//           <Card className="bg-white rounded-xl shadow-xl border-gray-100">
//             <CardHeader>
//               <CardTitle className="text-lg flex items-center">
//                 <Search className="mr-2 h-5 w-5 text-yellow-500" />
//                     Lookups
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <NumberTicker className="text-3xl font-bold">{stats.activeBans.toLocaleString()}</NumberTicker>
//               <CardDescription className="text-zinc-800">Currently banned from FiveM servers</CardDescription>
//             </CardContent>
//           </Card>

//           <Card className="bg-white rounded-xl shadow-xl border-gray-100">
//             <CardHeader>
//               <CardTitle className="text-lg flex items-center">
//                 <Users className="mr-2 h-5 w-5 text-blue-500" />
//                     Detections
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <NumberTicker className="text-3xl font-bold"/>
//               <CardDescription className="text-zinc-800">New cheaters detected this week</CardDescription>
//             </CardContent>
//           </Card>

//           <Card className="bg-white rounded-xl shadow-xl border-gray-100">
//             <CardHeader>
//               <CardTitle className="text-lg flex items-center">
//                 <Database className="mr-2 h-5 w-5 text-green-500" />
//                 Database
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <NumberTicker className="text-3xl font-bold">{stats.databaseSize}</NumberTicker>
//               <CardDescription className="text-zinc-800">Total size of cheat detection data</CardDescription>
//             </CardContent>
//           </Card>
//         </motion.div>
//     )
// }


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "motion/react"
import { Shield, Users, Database, Search } from "lucide-react"
import { NumberTicker } from "@/components/magicui/number-ticker"

export function Cards() {
    const stats = {
        totalCheaters: 24783,
        activeBans: 18452,
        recentDetections: 342,
        databaseSize: "1.2 GB",
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
              <CardDescription className="text-zinc-800">Identified and logged in our database</CardDescription>
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
                <NumberTicker 
                    value={stats?.activeBans || 0}
                    className="text-3xl font-bold"
                />
              <CardDescription className="text-zinc-800">Users who used the search function</CardDescription>
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
                <NumberTicker 
                    value={stats.activeBans}
                    className="text-3xl font-bold"
                />
              <CardDescription className="text-zinc-800">New cheaters detected this week</CardDescription>
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
                        value={parseFloat(stats.databaseSize || "0").toFixed
                            ? parseFloat(parseFloat(stats.databaseSize).toFixed(1))
                            : 0}
                        decimalPlaces={1}
                        className="text-3xl font-bold"
                    />
                    <h1 className="font-bold text-xl mt-[7px]">K</h1>
                </div>
              <CardDescription className="text-zinc-800">Total size of cheat detection data</CardDescription>
            </CardContent>
          </Card>
        </motion.div>
    )
}