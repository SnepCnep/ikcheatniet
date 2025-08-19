import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Twitter } from "lucide-react"
import Image from "next/image"

type Social = {
    github?: string;
    twitter?: string;
};

type Team = {
    name: string;
    role: string;
    type: string;
    description: string;
    avatar: string;
    social: Social;
}

export default function TeamPage() {
    const teamMembers: Array<Team> = [
        {
            name: "nQlix",
            role: "Owner & Lead Developer",
            type: "owner",
            description: "Developer in backend systems and frontend.",
            avatar: "https://cdn.discordapp.com/avatars/1369851724260446334/053c4ff1363d9aff96f892db274fb649.png?size=1024",
            social: {},
        },
        {
            name: "Scarlot",
            role: "Owner & Lead Developer",
            type: "owner",
            description: "Specializes in database optimization and API development for high-performance cheater detection.",
            avatar: "https://cdn.discordapp.com/avatars/483357154502377473/944a6d63a09c860f871e8c9d615e3a6d.png?size=1024",
            social: {
                github: "https://github.com/Scarlot-Ruskipy",
            },
        },
    ];

    const getRoleColor = (type: string) => {
        switch (type) {
            case "owner":
                return "bg-primary text-primary-foreground"
            case "developer":
                return "bg-accent text-accent-foreground"
            case "contributor":
                return "bg-muted text-muted-foreground"
            default:
                return "bg-secondary text-secondary-foreground"
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Our Team
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Meet the dedicated professionals behind IkCheatNiet.nl who work tirelessly to keep gaming communities safe
                        and fair.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <Card key={index} className="bg-card/50 border-border hover:bg-card/80 transition-colors shadow-lg shadow-primary/40 ">
                            <CardContent>
                                <Image
                                    src={member.avatar || "/placeholder.svg"}
                                    alt={member.name}
                                    width={96}
                                    height={96}
                                    className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-primary/20 object-cover"
                                />
                                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                                <Badge className={`mb-3 ${getRoleColor(member.type)}`}>{member.role}</Badge>
                                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{member.description}</p>

                                {/* Social Links */}
                                {member.social && [member.social.github, member.social.twitter].some(Boolean) ? (
                                    <div className="flex justify-center gap-3">
                                        {member.social.github && (
                                            <a
                                                href={member.social.github}
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                <Github className="w-5 h-5" />
                                            </a>
                                        )}
                                        {member.social.twitter && (
                                            <a
                                                href={member.social.twitter}
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                <Twitter className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                ) : (
                                    <span className="text-xs text-muted-foreground italic">No public socials</span>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div >
    )
}
