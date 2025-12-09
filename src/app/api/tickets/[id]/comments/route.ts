// app/api/tickets/[id]/comments/route.ts

import { NextResponse } from "next/server"
import { auth } from "@/src/auth"
import { db } from "@/src/lib/db"

type Params = { params: { id: string } }

export async function GET(_req: Request, { params }: Params) {
    try {
        const { id } = params
        // listar comentarios por ticket en orden cronológico
        const comments = await db.comment.findMany({
            where: { ticketId: id },
            orderBy: { createdAt: "asc" },
            include: {
                author: { select: { id: true, name: true, email: true, role: true } },
            },
        })
        return NextResponse.json(comments)
    } catch (error) {
        console.error("[COMMENTS_GET]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function POST(req: Request, { params }: Params) {
    try {
        const session = await auth()
        if (!session || !session.user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        const userId = session.user.id
        const role = session.user.role as "client" | "agent"
        const { id: ticketId } = params

        const body = await req.json()
        const { message } = body
        if (!message || !message.trim()) {
            return new NextResponse("Message is required", { status: 400 })
        }

        // verificar permisos: si es cliente, solo en sus tickets
        const ticket = await db.ticket.findUnique({ where: { id: ticketId } })
        if (!ticket) {
            return new NextResponse("Ticket not found", { status: 404 })
        }
        if (role === "client" && ticket.createdById !== userId) {
            return new NextResponse("Forbidden", { status: 403 })
        }

        const comment = await db.comment.create({
            data: {
                message,
                ticketId,
                authorId: userId,
            },
        })
        return NextResponse.json(comment, { status: 201 })
    } catch (error) {
        console.error("[COMMENTS_POST]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}
