import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"
import { db } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    // adapter of prisma
    adapter: PrismaAdapter(db),
    ...authConfig,
    session: { strategy: "jwt" },

    callbacks: {
        jwt({ token, user }) {
            if (user) {
                // guardar el rol en el token
                token.role = user.role;
                // guardar también el id del usuario en el token
                // @ts-ignore
                token.id = user.id;
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                // pasar el rol al objeto session.user
                // @ts-ignore
                session.user.role = token.role;
                // pasar el id al objeto session.user
                // @ts-ignore
                session.user.id = token.id;
            }
            return session
        },
    },
})
