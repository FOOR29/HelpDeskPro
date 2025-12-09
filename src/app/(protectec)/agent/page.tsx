// app/(protectec)/agent/page.tsx (o donde tengas AgentPage)

import { auth } from "@/src/auth"
import { db } from "@/src/lib/db"
import LogoutButton from "@/src/components/ui/LogoutButton"

const AgentPage = async () => {
    const session = await auth()
    console.log(session);

    if (!session || session.user.role !== "agent") {
        return <div>You are not agent</div>
    }

    // obtener todos los tickets (luego agregamos filtros)
    const tickets = await db.ticket.findMany({
        orderBy: { createdAt: "desc" },
    })

    return (
        <div>
            <h1>Agent dashboard</h1>

            {/* mostrar la sesión completa */}
            <pre>
                {
                    JSON.stringify(session, null, 2)
                }
            </pre>

            {/* mostrar todos los tickets para el agente */}
            <pre>
                {
                    JSON.stringify(tickets, null, 2)
                }
            </pre>

            <LogoutButton />
        </div>
    )
}

export default AgentPage
