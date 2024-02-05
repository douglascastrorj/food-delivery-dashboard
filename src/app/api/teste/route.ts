import { NextRequest, NextResponse } from "next/server";
import { extractServerSession, isLoggedIn } from "@/lib/authUtils";

export const GET = async (req: NextRequest, res: NextResponse) => {
    const session = await extractServerSession(req, res)
    console.log('session', session)

    const isLogged = await isLoggedIn(req, res);
    console.log('isLogged', isLogged)
    return new Response(JSON.stringify({ teste: 'hello world' }), { status: 200 });
}