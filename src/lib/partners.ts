import { Partner } from "@prisma/client";

import prisma from "@/lib/prisma";

class PartnersHandler {
    private Partners: Map<string, Partner>;

    constructor() {
        this.Partners = new Map<string, Partner>();

        this.initializePartners();
    }

    private async initializePartners() {
        const partners = await prisma.partner.findMany();

        if (partners) {
            partners.forEach((partner) => {
                this.Partners.set(partner.id, partner);
            });
        }

        const hardcodedPartners: Partner[] = [
            {
                name: "Sync AntiCheat",
                id: "sync-anticheat",
                type: "AntiCheat",
                description:
                    "Leading organization in FiveM server security, providing advanced anti-cheat solutions and threat intelligence.",
                banner: "https://cdn.discordapp.com/attachments/1390404300857016443/1407360240525246484/sync-anticheat-banner_1.png?ex=68a5d1dc&is=68a4805c&hm=bab77a2ecb3813616c8546524d51a9ad9492d788f9048038bf083c9e4702cf03&",
                logo: null,
                links: {
                    website: "https://sync-ac.xyz",
                    discord: "https://discord.gg/sync-ac",
                } as any,
                category: "security",
                features: ["Threat Intelligence", "Real-time Updates", "Community Reports"] as any,
                special: true,
                createdAt: null,
                updatedAt: null
            }
        ];

        hardcodedPartners.forEach((partner) => {
            if (!this.Partners.has(partner.id)) {
                this.Partners.set(partner.id, partner);
            }
        });

        console.log("Loaded all partners");
    }

    public getPartnerById(id: string): Partner | undefined {
        return this.Partners.get(id);
    }

    public getAllPartners(): Partner[] {
        return Array.from(this.Partners.values());
    }

}

if (!(global as any).partners) {
    (global as any).partners = new PartnersHandler();
}

export default (global as any).partners;