import NextAuth from "next-auth/next"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)//put in lib folder

export {handler as Get, handler as Post}