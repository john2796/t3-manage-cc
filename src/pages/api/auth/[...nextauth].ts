import { authOptions } from "@/server/auth";
import NextAuth from "next-auth";

/*
 * this will handle client side authentication
 * dynamic route handler for nextAuth
 *
 * @see  authOptions config
 * */
export default NextAuth(authOptions);
