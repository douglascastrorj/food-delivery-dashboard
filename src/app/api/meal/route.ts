import { connectToDB } from "@/database/db";
import MealSchema from "@/database/mealSchema";
import User from "@/database/User";
import { extractServerSession, isLoggedIn } from "@/lib/authUtils";
import { NextRequest } from "next/server";

export const POST = async (req, res) => {

    try {

        const { name, description, price, email, imagePath = null } = await req.json();
        await connectToDB();

        const user = await User.findOne({ email });

        const meal = await MealSchema.create({
            name,
            description,
            price,
            image: `${process.env.SUPABASE_STORAGE_URL}${imagePath}`,
            userId: user._id
        });

        return new Response(JSON.stringify(meal), { status: 201 });
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify(e), { status: 500 });
    }
}




export const GET = async (req: NextRequest, res) => {

    const page = parseInt(req.nextUrl.searchParams.get('page') as string) || 1;
    const limit = parseInt(req.nextUrl.searchParams.get('limit') as string) || 1;
        
    const session = await extractServerSession(req, res);

    const email = session?.user?.email;

    await connectToDB();
    
    const user = await User.findOne({ email });
    const meals = await MealSchema.find({
        userId: user._id,
    }) 
    .skip((page-1) * limit)
    .limit(limit);

    const count = await MealSchema.countDocuments({ userId: user._id });
    

    return new Response(JSON.stringify({meals, count}), { status: 200 });
}
