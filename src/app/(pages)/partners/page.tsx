import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Shield, Server, Users, Globe, MessageCircle } from "lucide-react"

type PartnerLink = {
  website?: string
  discord?: string
}

type Partner = {
  name: string
  type: string
  description: string
  banner?: string
  logo?: string
  links: PartnerLink
  category: string
  features: string[]
}

export default function PartnersPage() {
  const partners: Partner[] = [
    {
      name: "Sync AntiCheat",
      type: "AntiCheat",
      description:
        "Leading organization in FiveM server security, providing advanced anti-cheat solutions and threat intelligence.",
      banner: "https://cdn.discordapp.com/attachments/1390404300857016443/1407360240525246484/sync-anticheat-banner_1.png?ex=68a5d1dc&is=68a4805c&hm=bab77a2ecb3813616c8546524d51a9ad9492d788f9048038bf083c9e4702cf03&",
      links: {
        website: "https://sync-ac.xyz",
        discord: "https://discord.gg/sync-ac",
      },
      category: "security",
      features: ["Threat Intelligence", "Real-time Updates", "Community Reports"],
    }
  ]

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
          {partners.map((partner, index) => (
            <Card key={index} className="bg-card/50 border-border hover:bg-card/80 transition-all duration-300 group">
              <CardContent className="p-6">
                {/* Partner Banner/Logo */}
                <div className="mb-4 flex justify-center">
                  <img
                    src={partner.banner || partner.logo || "/placeholder.svg"}
                    alt={`${partner.name} ${partner.banner ? "banner" : "logo"}`}
                    className={`${partner.banner ? "h-24 w-full" : "h-16"} object-contain opacity-80 group-hover:opacity-100 transition-opacity ${partner.banner ? "rounded-lg" : ""}`}
                  />
                </div>

                {/* Partner Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
                  <Badge className={`mb-3 ${getCategoryColor(partner.category)}`}>
                    <span className="flex items-center gap-1">
                      {getCategoryIcon(partner.category)}
                      {partner.type}
                    </span>
                  </Badge>
                </div>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{partner.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {partner.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-2">
                  {partner.links.website && (
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
                  {partner.links.discord && (
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
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="text-center">
          <Card className="bg-card/30 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Become a Partner</h2>
              <p className="text-muted-foreground mb-6">
                Interested in partnering with us to create a safer gaming environment? We're always open to
                collaborating with organizations that share our values.
              </p>
              <a
                href="https://discord.gg/Pk3ZuYw6jX"
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
