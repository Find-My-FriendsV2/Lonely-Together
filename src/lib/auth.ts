import { NextAuthOptions, getServerSession } from "next-auth";
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import  GoogleProvider  from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import {nanoid} from "nanoid"

export const authOptions: NextAuthOptions =  {
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt" 
    },
    pages: {
        signIn: "/sign-in",
        error: "/",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
          }),
          GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
          })
      
    ],
    callbacks: {
        async session({token, session}){
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.image
                session.user.username = token.username

            }
            return session
        },
        async jwt({token, user}){

            const dbUser = await db.user.findFirst({
                where: {
                    email : token.email
                }
            })
            if (!dbUser){
                token.id = user!.id
                return token
            }
            if (!dbUser.username){
                await db.user.update({
                    where: {
                        id: dbUser.id,  
                    },
                    data: {
                        username: nanoid(10)
                    }
                })
            }
            return {
                id:dbUser.id,
                name:dbUser.name,
                email:dbUser.email,
                image:dbUser.image,
                username:dbUser.username
            }
        },
        redirect(){
            return '/'
        }
    }

}

export const getAuthSession = () => getServerSession(authOptions)

// import { NextAuthOptions, getServerSession } from "next-auth";
// import { db } from "./db";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import GoogleProvider from "next-auth/providers/google";
// import DiscordProvider from "next-auth/providers/discord";
// import GitHubProvider from "next-auth/providers/github";
// import { nanoid } from "nanoid";

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(db),
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/sign-in",
//     error: "/error", // Customize this page to provide meaningful feedback
//   },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     DiscordProvider({
//       clientId: process.env.DISCORD_CLIENT_ID!,
//       clientSecret: process.env.DISCORD_CLIENT_SECRET!,
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async session({ token, session }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.name = token.name;
//         session.user.email = token.email;
//         session.user.image = token.image;
//         session.user.username = token.username;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         // Check if the user exists in the database
//         const dbUser = await db.user.findFirst({
//           where: { email: user.email },
//         });

//         if (!dbUser) {
//           // Create a new user if not exists
//           const newUser = await db.user.create({
//             data: {
//               email: user.email!,
//               name: user.name!,
//               image: user.image!,
//               username: nanoid(10), // Generate a username if missing
//             },
//           });
//           token.id = newUser.id;
//         } else {
//           // Update token with existing user's info
//           token.id = dbUser.id;
//           token.username = dbUser.username;
//         }
//       }

//       return token;
//     },
//     async redirect({ url, baseUrl }) {
//       // Redirect user to the URL they were trying to access before sign-in
//       return url.startsWith(baseUrl) ? url : baseUrl;
//     },
//   },
// };

// export const getAuthSession = () => getServerSession(authOptions);
