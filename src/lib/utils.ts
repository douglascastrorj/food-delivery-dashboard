import { type ClassValue, clsx } from "clsx"
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { twMerge } from "tailwind-merge"
import { authOptions } from "../app/api/auth/[...nextauth]/route"
import { NextApiRequest, NextApiResponse } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
