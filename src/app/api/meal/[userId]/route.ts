import { connectToDB } from "@/database/db";
import MealSchema from "@/database/mealSchema";
import User from "@/database/User";
import { extractServerSession, isLoggedIn } from "@/lib/authUtils";


export const GET = async (req, res) => {
    
    const params = res.params;

    const session = await extractServerSession(req, res);
    if (!!session === false) {
        return new Response(JSON.stringify({ message: 'Not logged in' }), { status: 401 });
    }

    const email = session.user?.email;
    if(params.userId !== email) {
        return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
    }

    const user = await User.findOne({ email });
    
    await connectToDB();
    const meals = await MealSchema.find({
        userId: user._id
    });
    return new Response(JSON.stringify(meals), { status: 200 });
}
