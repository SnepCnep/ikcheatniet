"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, AlertCircle, Shield, Server, ChevronDown, Copy, X } from "lucide-react"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { Cards } from "@/components/cards"
import Image from "next/image"
import { toast } from "sonner"

// types
interface UserData {
  discordId: string
  username: string
  avatar: string | null
  banner: string | null
  blacklistedservers: { id: string; name: string; type: string }[] | null
}

// interface ServerData {
//   totalCheaters: number
//   activeBans: number
//   recentDetections: number
//   databaseSize: string
// }

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userData, setUserData] = useState<UserData | null>(null)
  // const [serverData, setServerData] = useState<ServerData | null>(null)
  const [serversExpanded, setServersExpanded] = useState(false)

  useEffect(() => {
    const fetchServerData = async () => {

      try {
        const res = await fetch('/api/stats', {
          method: "GET",
        })
        if (!res.ok) throw new Error("Failed to fetch server data")
        const data = await res.json()
        console.log(data)
        // setServerData(data)
      } catch (error) {
        console.error("Error fetching server data:", error)
      }
    }
    fetchServerData()
  }, [])

  async function HandleInputReq(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()


    if (!searchQuery || searchQuery.length < 16) {
      toast("Please enter a valid Discord ID.", { style: { backgroundColor: "#f87171" } })
      return
    }

    try {
      const res = await fetch(`/api/lookup?id=${encodeURIComponent(searchQuery)}`, {
        method: "GET",
      })

      if (!res.ok) {
        toast("Action Failed, This Discord ID does not exist in our database.", { style: { backgroundColor: "#f87171" } })
        return
      }

      const data = await res.json()
      setUserData(data)
      setServersExpanded(false)
    } catch (err) {
      console.error("Fout bij ophalen:", err)
    }
  }

  const resetSearch = () => {
    setUserData(null)
    setSearchQuery("")
    setServersExpanded(false)
  }

  const getAvatarUrl = (userId: string | null, avatarHash: string | null) => {
    if (!avatarHash) return "/discordico.webp"
    const isGif = avatarHash.startsWith("a_")
    const ext = isGif ? "gif" : "png"
    return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${ext}?size=128`
  }

  const getBannerUrl = (userId: string | null, bannerHash: string | null) => {
    if (!bannerHash) return null
    const isGif = bannerHash.startsWith("a_")
    const ext = isGif ? "gif" : "png"
    return `https://cdn.discordapp.com/banners/${userId}/${bannerHash}.${ext}?size=600`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast("Discord ID copied to clipboard!", { style: { backgroundColor: "#67e8f9" } })
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-b from-white to-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <motion.div
          className="mb-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <AnimatedGradientText
            colorFrom="#067fb8"
            colorTo="#22c5ee"
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            FiveM Cheat Lookup
          </AnimatedGradientText>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gray-600 max-w-md mx-auto mb-10 text-lg"
        >
          Search and identify FiveM cheaters quickly and easily
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <motion.div
          className="bg-white rounded-xl shadow-xl overflow-hidden p-8 border border-gray-100"
          whileHover={{
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-left mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Search Database</h2>
            <p className="text-gray-500">Enter Discord ID</p>
          </div>

          <div className="relative w-full">
            <motion.div
              className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Search className="h-5 w-5" />
            </motion.div>

            <Input
              type="text"
              placeholder="Search by Discord ID..."
              className="pl-10 pr-14 h-12 text-base rounded-lg border border-gray-300 focus:ring-[#067fb8] focus:border-[#067fb8] w-full rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <form onSubmit={HandleInputReq}>
              <Button
                type="submit"
                className="hover:cursor-pointer absolute top-1/2 -translate-y-1/2 right-2 h-9 w-9 rounded-full bg-gradient-to-r from-[#067fb8] to-[#22b4ee] hover:opacity-90 flex items-center justify-center transition-all"
              >
                <Search className="h-5 w-5 text-white" />
              </Button>
            </form>
          </div>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              {userData ? (
                <motion.div
                  key="userData"
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    y: 0,
                    transition: {
                      height: { duration: 0.4 },
                      opacity: { duration: 0.3, delay: 0.2 },
                      y: { duration: 0.3, delay: 0.1 },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    y: -20,
                    transition: {
                      height: { duration: 0.3 },
                      opacity: { duration: 0.2 },
                      y: { duration: 0.2 },
                    },
                  }}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md relative"
                >
                  {/* Close Button */}
                  <motion.button
                    onClick={resetSearch}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.2 }}
                    className="absolute top-3 left-3 z-10 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:bg-white cursor-pointer hover:shadow-lg transition-all duration-200"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </motion.button>

                  {/* Discord Card */}
                  <div className="flex flex-col">
                    {/* Banner */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative h-32 w-full overflow-hidden bg-gradient-to-r from-[#5865F2] to-[#7289DA]"
                    >
                      {userData.banner && (
                        <Image
                          width={96}
                          height={32}
                          src={getBannerUrl(userData.discordId, userData.banner) || "/placeholder.svg"}
                          alt="User banner"
                          className="h-full w-full object-cover"
                        />
                      )}

                      {/* Status Badge */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.2 }}
                        className={`absolute top-3 right-3 px-2 py-1 text-xs font-bold rounded-full shadow-md ${userData.blacklistedservers && userData.blacklistedservers.length > 0
                            ? "bg-red-500"
                            : "bg-green-500"
                          }`}
                      >
                        <div className="flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>
                            {userData.blacklistedservers && userData.blacklistedservers.length > 0
                              ? "FLAGGED"
                              : "CLEAN"}
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Profile Info */}
                    <div className="relative px-5 pb-5">
                      {/* Avatar */}
                      <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="absolute -top-12 left-5 h-24 w-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden"
                      >
                        <Image
                          width={96}
                          height={96}
                          src={getAvatarUrl(userData.discordId, userData.avatar) || "/discordico.webp"}
                          alt="User avatar"
                          className="h-full w-full object-cover"
                        />
                      </motion.div>

                      {/* Username and ID */}
                      <div className="mt-14 mb-4">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                          className="flex items-center"
                        >
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{userData.username}</h3>
                            <div className="flex items-center gap-1">
                              <p className="text-sm text-gray-500">Discord ID: {userData.discordId}</p>
                              <button
                                onClick={() => copyToClipboard(userData.discordId)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Copy Discord ID"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Blacklisted Servers Section */}
                      {userData.blacklistedservers && userData.blacklistedservers.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.5 }}
                          className="mt-4"
                        >
                          {/* Header with toggle button */}
                          <motion.button
                            onClick={() => setServersExpanded(!serversExpanded)}
                            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors hover:cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-red-500" />
                              <h4 className="font-semibold text-gray-700">
                                Blacklisted Servers ({userData.blacklistedservers.length})
                              </h4>
                            </div>
                            <motion.div
                              animate={{ rotate: serversExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            </motion.div>
                          </motion.button>

                          {/* Summary (always visible) */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.3 }}
                            className="mt-3 px-3"
                          >
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Status:</span> Flagged in{" "}
                              {userData.blacklistedservers.length} servers
                            </p>
                          </motion.div>

                          {/* Detailed list (expandable) */}
                          <AnimatePresence>
                            {serversExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                  height: "auto",
                                  opacity: 1,
                                  transition: {
                                    height: { duration: 0.4 },
                                    opacity: { duration: 0.3, delay: 0.1 },
                                  },
                                }}
                                exit={{
                                  height: 0,
                                  opacity: 0,
                                  transition: {
                                    height: { duration: 0.3 },
                                    opacity: { duration: 0.2 },
                                  },
                                }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-2 mt-3 px-3 pb-2">
                                  {userData.blacklistedservers.map((server, index) => (
                                    <motion.div
                                      key={server.id}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                                      className="flex items-center gap-2 p-2 rounded-md bg-gray-50 border border-gray-100"
                                    >
                                      <Server className="h-4 w-4 text-gray-500" />
                                      <div>
                                        <p className="text-sm font-medium text-gray-700">{server.name}</p>
                                        <p className="text-xs text-gray-500">
                                          ID: {server.id} • Type: {server.type}
                                        </p>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}

                      {/* Reset Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.3 }}
                        className="mt-6 flex justify-center"
                      >
                        <Button
                          onClick={resetSearch}
                          variant="outline"
                          className="px-4 py-2 text-sm border border-gray-200 hover:bg-gray-50 transition-colors hover:cursor-pointer"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Close and search again
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="popularSearches"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex flex-wrap gap-2"
                >
                  <div className="text-sm text-gray-500">Popular searches:</div>
                  {["630029784302485524", "483357154502377473", "713448937490481182", "158936675483910144"].map(
                    (tag, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-[0.6px] bg-gray-100 rounded-full text-sm text-gray-700 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setSearchQuery(tag)}
                      >
                        {tag}
                      </motion.span>
                    ),
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-6"
        >
          <Cards />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mt-8"
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Contributors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Arootsy", image: "https://github.com/Arootsy.png", role: "Front-End Developer" },
                { name: "SnepCnep", image: "https://github.com/SnepCnep.png", role: "Back-End Developer" },
                { name: "Scarlot-Ruskipy", image: "https://github.com/Scarlot-Ruskipy.png", role: "Back-End Developer" },
              ].map((contributor, index) => {
                const githubUrl = `https://github.com/${contributor.name}`;

                return (
                  <motion.a
                    key={index}
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                    className="flex flex-col items-center bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#067fb8] mb-3">
                      <Image
                        src={contributor.image || "/placeholder.svg"}
                        alt={`${contributor.name}'s GitHub profile`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <span className="text-gray-800 font-medium text-lg">{contributor.name}</span>
                    <span className="text-gray-500 text-sm">{`Contributor • ${contributor.role}`}</span>
                  </motion.a>
                );
              })}
            </div>

          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
