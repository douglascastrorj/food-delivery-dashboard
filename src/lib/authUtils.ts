import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../app/api/auth/[...nextauth]/route"
import { NextApiRequest, NextApiResponse } from "next";

export const extractServerSession = async (req: NextRequest, res: NextResponse) => {
    const session = await getServerSession(
      req as unknown as NextApiRequest,
      {
        ...res,
        getHeader: (name: string) => res.headers?.get(name),
        setHeader: (name: string, value: string) => res.headers?.set(name, value),
      } as unknown as NextApiResponse,
      authOptions
    );
  
    return session;
  }
  
  export const isLoggedIn = async (req: NextRequest, res: NextResponse) => {
    const session = await extractServerSession(req, res)
    return !!session;
  }