// app/(protectec)/dashboard/page.tsx

import { auth } from "@/src/auth"
import ClientDashboard from "@/src/components/ClientDashboard"
import { db } from "@/src/lib/db"

const ClientPage = async () => {
    // obtener la sesión del usuario autenticado
    const session = await auth()
    if (!session) {
        return <div>Not autenticado</div>
    }

    // obtener los tickets creados por este cliente
    const tickets = await db.ticket.findMany({
        where: { createdById: session.user.id }, // solo sus tickets
        orderBy: { createdAt: "desc" },
    })

    return (
        <ClientDashboard
            // nombre visible en el header (fallback al email si no hay nombre)
            userName={session.user.name || session.user.email}
            tickets={tickets}
        />
    )
}

export default ClientPage
