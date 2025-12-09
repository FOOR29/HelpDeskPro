// app/(protectec)/dashboard/page.tsx (o donde tengas ClientPage)

import { auth } from "@/src/auth"
import { db } from "@/src/lib/db"
import LogoutButton from "@/src/components/ui/LogoutButton"

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
        <div>
            <h1>Client dashboard</h1>

            {/* mostrar la sesión completa */}
            <pre>
                {
                    JSON.stringify(session, null, 2)
                }
            </pre>

            {/* por ahora mostramos los tickets en bruto para probar */}
            <pre>
                {
                    JSON.stringify(tickets, null, 2)
                }
            </pre>

            <LogoutButton />
        </div>
    )
}

export default ClientPage
