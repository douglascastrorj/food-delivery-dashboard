import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true); 
    if(isConnected) {
        console.log('Mongodb is already connected.')
        return;
    }

    try {
        mongoose.connect(process.env.DATABASE_URL, {
            dbName: 'food-delivery',
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = true;
        console.log('MongoDB Connected.')
    } catch (error) {
        console.log(error)
    }
}