import { connectToDB } from "@/database/db";
import MealSchema from "@/database/mealSchema";
import User from "@/database/User";


export const GET = async (req, {params}) => {

    console.log(params)

    const user = await User.findOne({ email: params.userId });
    
    await connectToDB();
    const meals = await MealSchema.find({
        userId: user._id
    });
    console.log(meals)
    return new Response(JSON.stringify(meals), { status: 200 });
}
