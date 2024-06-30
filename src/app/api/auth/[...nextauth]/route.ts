import NextAuth from "next-auth/next"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)//put in lib folder

export {handler as GET, handler as POST}


// import NextAuth from "next-auth";
// import { authOptions } from "@/lib/auth";

// // Handles GET requests to /api/auth/[...nextauth]
// export async function GET(request: Request) {
//   const response = await NextAuth(authOptions)(request, { method: "GET" });
//   return response;
// }

// // Handles POST requests to /api/auth/[...nextauth]
// export async function POST(request: Request) {
//   const response = await NextAuth(authOptions)(request, { method: "POST" });
//   return response;
// }
