// app/api/tickets/route.ts

import { NextResponse } from "next/server"
import { auth } from "@/src/auth"
import { db } from "@/src/lib/db"

export async function GET() {
    try {
        const session = await auth()

        if (!session || !session.user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { role, id } = session.user as { role: "client" | "agent"; id: string }

        let tickets

        if (role === "client") {
            // cliente: solo sus tickets
            tickets = await db.ticket.findMany({
                where: { createdById: id },
                orderBy: { createdAt: "desc" },
            })
        } else {
            tickets = await db.ticket.findMany({
                orderBy: { createdAt: "desc" },
            })
        }

        return NextResponse.json(tickets)
    } catch (error) {
        console.error("[TICKETS_GET]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth()

        if (!session || !session.user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { role, id } = session.user as { role: "client" | "agent"; id: string }

        // solo clientes pueden crear tickets
        if (role !== "client") {
            return new NextResponse("Forbidden", { status: 403 })
        }

        const body = await req.json()
        const { title, description, priority } = body

        if (!title || !description) {
            return new NextResponse("Missing fields", { status: 400 })
        }

        const ticket = await db.ticket.create({
            data: {
                title,
                description,
                priority: priority ?? "MEDIUM",
                createdById: id,
            },
        })

        return NextResponse.json(ticket, { status: 201 })
    } catch (error) {
        console.error("[TICKETS_POST]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
