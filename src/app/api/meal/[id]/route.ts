import { connectToDB } from "@/database/db";
import MealSchema from "@/database/mealSchema";
import User from "@/database/User";
import { extractServerSession, isLoggedIn } from "@/lib/authUtils";
import { supabase } from "@/lib/supabase";


export const DELETE = async (req, res) => {
    
    const { id } = res.params;

    const session = await extractServerSession(req, res);
    if (!!session === false) {
        return new Response(JSON.stringify({ message: 'Not logged in' }), { status: 401 });
    }

    const email = session.user?.email;
   
    await connectToDB();
    const user = await User.findOne({ email });
    
    const meals = await MealSchema.find({
        userId: user._id,
        _id: id
    });

    if(meals.length === 0) {
        return new Response(JSON.stringify({ message: 'Meal not found' }), { status: 404 });
    }

    try {
        //food-delivery-restaurants/meals/cafe.jpg
        const filePath = meals[0].image.split('food-delivery-restaurants/')[1];
        const folder = filePath.split('/')[0];
        const fileName = filePath.split('/')[1];

        await supabase.storage
            .from(`food-delivery-restaurants/${folder}`)
            .remove([fileName]);
    } catch(e){
        console.log('error deleting image', e);
    }

    const meal = MealSchema.deleteOne({ _id: id }).exec();

    return new Response(JSON.stringify(meal), { status: 200 });
}
