import { connectToDB } from "@/database/db";
import MealSchema from "@/database/mealSchema";
import User from "@/database/User";


export const POST = async (req, res) => {

    try {
        const { name, description, price, user: { email } = null, image = null } = await req.json();
        await connectToDB();

        const user = await User.findOne({ email });

        const meal = await MealSchema.create({
            name,
            description,
            price,
            image,
            userId: user._id
        });

        return new Response(JSON.stringify(meal), { status: 201 });
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify(e), { status: 500 });
    }
}