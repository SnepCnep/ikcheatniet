"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Cards } from '@/components/cards'

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-b from-white to-gray-50">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center">
                <motion.div
                    className="mb-2"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1],
                    }}>
                    <AnimatedGradientText
                        colorFrom="#067fb8"
                        colorTo="#22c5ee"
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
                        FiveM Cheat Lookup
                    </AnimatedGradientText>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-gray-600 max-w-md mx-auto mb-10 text-lg">
                    Search and identify FiveM cheaters quickly and easily
                </motion.p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="w-full max-w-3xl">
                <motion.div
                    className="bg-white rounded-xl shadow-xl overflow-hidden p-8 border border-gray-100"
                    whileHover={{
                        boxShadow:
                            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    }}
                    transition={{ duration: 0.2 }}>
                    <div className="text-left mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            Search Database
                        </h2>
                        <p className="text-gray-500">Enter Discord ID</p>
                    </div>

                    <div className="relative w-full">
                        <motion.div
                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}>
                            <Search className="h-5 w-5" />
                        </motion.div>

                        <Input
                            type="text"
                            placeholder="Search by Discord ID..."
                            className="pl-10 pr-14 h-12 text-base rounded-lg border border-gray-300 focus:ring-[#067fb8] focus:border-[#067fb8] w-full rounded-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <Button
                            type="submit"
                            className="hover:cursor-pointer absolute top-1/2 -translate-y-1/2 right-2 h-9 w-9 rounded-full bg-gradient-to-r from-[#067fb8] to-[#22b4ee] hover:opacity-90 flex items-center justify-center transition-all">
                            <Search className="h-5 w-5 text-white" />
                        </Button>
                    </div>

                    <motion.div
                        className="mt-6 flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}>
                        <div className="text-sm text-gray-500">Popular searches:</div>
                        {[
                            "1171497849406632047",
                            "898950834757447780",
                            "630029784302485524",
                            "713448937490481182",
                        ].map((tag, index) => (
                            <motion.span
                                key={index}
                                className="px-3 py-[0.6px] bg-gray-100 rounded-full text-sm text-gray-700 cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setSearchQuery(tag)}>
                                {tag}
                            </motion.span>
                        ))}
                    </motion.div>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="mt-6">
                        <Cards/>
                </motion.div>
            </motion.div>
        </div>
    );
}
