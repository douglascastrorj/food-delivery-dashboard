import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import User from "../../../../database/User";
import { connectToDB } from "../../../../database/db";
import { compare } from "bcrypt";


const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials) {

                console.log('authorized was called')

                await connectToDB();
                const user = await User.findOne({
                    email: credentials?.email
                });
    
                if(!user) {
                    throw new Error('User not found');
                }

                const isCorrectPassword = await compare(credentials?.password, user.password);
                if(!isCorrectPassword) {
                    console.log('incorrect password')
                    throw new Error('Incorrect password');
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    // callbacks: {
    //     async jwt(token, user, account, profile, isNewUser) {
    //         if (user) {
    //             token.id = user.id;
    //         }
    //         return token;
    //     },
    //     async session(session, token) {
    //         return {...session, ...token};
    //     }
    // },
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST , handler as authOptions };