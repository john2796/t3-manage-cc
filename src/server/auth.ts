import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { prisma } from "@/server/db";
import { env } from "@/env.mjs";

/*
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the object and keep type safety
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 * */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // roles: UserRole
    } & DefaultSession["user"];
  }

  // interface User {
  // ..other properties
  // role: UserRole;
  // }
}

/*
 * Options for NextAuth used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 * */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    /* ...you can add more providers here*/
  ],
};

/*
 * Wrapper for getServerSession so you don't have to import the authOptions in every file
 *
 * @see https://next-auth.js.org/configuration/nextjs
 * */

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
