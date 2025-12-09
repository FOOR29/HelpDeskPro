import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { NextResponse } from "next/server"


// esto te redireciona al login si intentas entrar al dashboard con /dashboard
const { auth: middleware } = NextAuth(authConfig)

// un arrays con las rutas publicas
const publicRoutes = [
    "/",
    "/login",
    "/register",
    // "/eror" esta es opcional
]

export default middleware((req) => {
    const { nextUrl, auth } = req
    const isLoggedIn = !!auth?.user

    // peoteger las rutas
    if (!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
        return NextResponse.redirect(new URL("login", nextUrl))
    }

    return NextResponse.next();
})

//  Mantenemos la configuración de las rutas (Matcher)
export const config = {
    matcher: [
        // Excluir archivos internos de Next.js y estáticos
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};