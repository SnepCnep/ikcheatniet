import { NextResponse } from "next/server";
import PartnerHandler from "@/lib/partners";


export async function GET(req: Request) {
    const partnerId = req.headers.get('partnerId');
    if (!partnerId) {
        const partners = await PartnerHandler.getAllPartners();
        return NextResponse.json(partners);
    }

    const partner = await PartnerHandler.getPartnerById(partnerId);
    if (!partner) {
        return NextResponse.json({ message: "Partner not found" }, { status: 404 });
    }

    return NextResponse.json(partner);
}
