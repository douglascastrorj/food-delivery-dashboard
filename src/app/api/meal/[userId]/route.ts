import { connectToDB } from "@/database/db";
import MealSchema from "@/database/mealSchema";
import User from "@/database/User";
import { isLoggedIn } from "@/lib/authUtils";


export const GET = async (req, res) => {
    
    const params = res.params;

    const isLogged = await isLoggedIn(req, res);
    if (!isLogged) {
        return new Response(JSON.stringify({ message: 'Not logged in' }), { status: 401 });
    }
    const user = await User.findOne({ email: params.userId });
    
    await connectToDB();
    const meals = await MealSchema.find({
        userId: user._id
    });
    return new Response(JSON.stringify(meals), { status: 200 });
}
