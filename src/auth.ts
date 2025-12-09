import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"  // esto se deb einstalar como: 'npm install @auth/prisma-adapter' ya que este es el puente entre nextaut y prisma
import authConfig from "@/auth.config"
import { db } from "./lib/db";


export const { handlers, signIn, signOut, auth } = NextAuth({
    // le pasamos el adaptador de prisma
    adapter: PrismaAdapter(db),
    ...authConfig, // se destructura el authconfig
    session: { strategy: "jwt" }, // esto significa que cada ves que se loguee un cliente  correctamente 
    // se crea un token y se crea un seccion, seccion que se usa para proteger rutas

    // esto es para roles, si no quieres manejar la seccion por roles puede eliminar esto
    callbacks: {
        //JWT se crea cada ves que crea o actulizaun tokn JWT
        // aqui es donde puedes agregar informacion adicional al tokens
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.role = user.role;
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                session.user.role = token.role
            }
            return session
        },
    },
})