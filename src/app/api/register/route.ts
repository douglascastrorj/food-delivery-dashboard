import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

import User from "../../../models/user";
import { connectToDB } from "../../../database/db";


export const POST = async (req, res) => {
    try {
        const { email, password } = await req.json();
        console.log('registering user')
        console.log({ email, password })

        if (!email || !password) {
            return new Response(JSON.stringify({error: 'Email and password required'}), { status: 401 });
        }

        await connectToDB();
        const userExists = await User.findOne({
            email
        });

        if(userExists)return new Response(JSON.stringify({error: 'User already exists'}), { status: 401 });
        
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            email,
            password: hashedPassword,
            username: email,
            image: null
        });

        return new Response(JSON.stringify(newUser), { status: 201 });

    } catch (e) {
        console.log(e);
        return new Response('Failed to register', { status: 500 });
    }
}