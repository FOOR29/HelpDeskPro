import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { NextResponse } from "next/server"

const { auth: middleware } = NextAuth(authConfig)

const publicRoutes = ["/", "/login", "/register"]

export default middleware((req) => {
    const { nextUrl, auth } = req
    const isLoggedIn = !!auth?.user
    const pathname = nextUrl.pathname
    const role = auth?.user?.role as "client" | "agent" | undefined

    // Si no está logueado y ruta no es pública → a /login
    if (!publicRoutes.includes(pathname) && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", nextUrl))
    }

    // Si está logueado y entra a /login o /register → redirigir según rol
    if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
        if (role === "agent") {
            return NextResponse.redirect(new URL("/agent", nextUrl))
        }
        return NextResponse.redirect(new URL("/dashboard", nextUrl))
    }

    // Proteger ruta /agent: solo agentes
    if (pathname.startsWith("/agent") && role !== "agent") {
        return NextResponse.redirect(new URL("/dashboard", nextUrl))
    }

    // Proteger ruta /dashboard: solo clientes
    if (pathname.startsWith("/dashboard") && role !== "client") {
        return NextResponse.redirect(new URL("/agent", nextUrl))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
