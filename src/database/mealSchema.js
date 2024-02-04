import { Schema, model, models } from "mongoose";

const MealSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required.'],
    },
    name: {
        type: String,
        required: [true, 'Username is required.'],
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
    },
    image: {
        type: String
    }
});

const MealModel = models.Meal || model('Meal', MealSchema);
export default MealModel;

// module.exports = model("Meal", MealSchema);
