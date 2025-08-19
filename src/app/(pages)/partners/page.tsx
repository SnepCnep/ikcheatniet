"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Shield, Server, Users, Globe, MessageCircle } from "lucide-react"
import Image from "next/image"
import type { Partner as PrismaPartner } from "@prisma/client"

import { useState, useEffect } from "react"

type Partner = Omit<PrismaPartner, "features" | "links"> & {
  features?: string[];
  links?: {
    website?: string;
    discord?: string;
    [key: string]: string | undefined;
  };
};

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("/api/partners")
        if (!response.ok) {
          throw new Error("Failed to fetch partners")
        }
        const data = await response.json()
        setPartners(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Error fetching partners:", error)
      }
    }

    fetchPartners()
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "security":
        return <Shield className="w-5 h-5" />
      case "technology":
        return <Server className="w-5 h-5" />
      case "community":
        return <Users className="w-5 h-5" />
      case "industry":
        return <Shield className="w-5 h-5" />
      default:
        return <Server className="w-5 h-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "security":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      case "technology":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      case "community":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      case "industry":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Our Partners
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We collaborate with leading organizations in gaming security, technology, and community management to
            provide the best anti-cheat solutions.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {partners && partners.length > 0 ? (
            partners.map((partner: Partner, index: number) => (
              <Card
                key={index}
                className={`bg-card/50 border-border hover:bg-card/80 transition-all duration-300 group ${
                  partner.special
                    ? "relative border-2 border-primary shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:border-primary bg-gradient-to-br from-primary/5 to-accent/5 scale-105 hover:scale-110"
                    : ""
                }`}
              >
                {partner.special && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <Badge className="bg-primary text-primary-foreground shadow-lg animate-bounce">
                      ⭐ Featured Partner
                    </Badge>
                  </div>
                )}

                <CardContent className="p-6">
                  {/* Partner Banner/Logo */}
                  <div className="mb-4 flex justify-center">
                    <Image
                      src={partner.banner || partner.logo || "/placeholder.svg"}
                      alt={`${partner.name} ${partner.banner ? "banner" : "logo"}`}
                      width={partner.banner ? 600 : 120}
                      height={partner.banner ? 96 : 64}
                      className={`${partner.banner ? "h-24 w-full" : "h-16"} object-contain opacity-80 group-hover:opacity-100 transition-opacity ${partner.banner ? "rounded-lg" : ""} ${partner.special ? "drop-shadow-lg" : ""}`}
                      style={{
                        width: partner.banner ? "100%" : undefined,
                        height: partner.banner ? "6rem" : undefined,
                      }}
                      priority={index === 0}
                    />
                  </div>

                  {/* Partner Info */}
                  <div className="text-center mb-4">
                    <h3 className={`text-xl font-semibold mb-2 ${partner.special ? "text-primary" : ""}`}>
                      {partner.name}
                    </h3>
                    <Badge
                      className={`mb-3 ${getCategoryColor(partner.category ?? "")} ${partner.special ? "shadow-md border-primary/30" : ""}`}
                    >
                      <span className="flex items-center gap-1">
                        {getCategoryIcon(partner.category ?? "")}
                        {partner.type}
                      </span>
                    </Badge>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{partner.description}</p>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {partner.features && partner.features.length > 0 ? (
                        partner.features.map((feature: string, featureIndex: number) => (
                          <Badge key={featureIndex} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground italic">No features listed</span>
                      )}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 justify-center">
                    {partner.links?.website && (
                      <a
                        href={partner.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
                      >
                        <Globe className="w-3 h-3" />
                        Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {partner.links?.discord && (
                      <a
                        href={partner.links.discord}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
                      >
                        <MessageCircle className="w-3 h-3" />
                        Discord
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground py-12">
              <p className="text-lg">No partners found at this time. Please check back later!</p>
            </div>
          )}
        </div>

        {/* Partnership CTA */}
        <div className="text-center">
          <Card className="bg-card/30 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Become a Partner</h2>
              <p className="text-muted-foreground mb-6">
                Interested in partnering with us to create a safer gaming environment? We&#39;re always open to
                collaborating with organizations that share our values.
              </p>
              <a
                href="mailto:partnerships@ikcheatniet.nl"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Contact Partnerships
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}