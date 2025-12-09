// app/(protectec)/agent/page.tsx

import { auth } from "@/src/auth"
import AgentDashboard from "@/src/components/AgentDashboard";
import { db } from "@/src/lib/db"

const AgentPage = async () => {
    const session = await auth()
    console.log(session);

    if (!session || session.user.role !== "agent") {
        return <div>You are not agent</div>
    }

    // get all tickets (later we can add filters)
    const tickets = await db.ticket.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            createdBy: {
                select: { name: true, email: true }
            },
            assignedTo: {
                select: { id: true, name: true, email: true }
            }
        }
    })

    // get list of agents to assign
    const agents = await db.user.findMany({
        where: { role: "agent" },
        select: { id: true, name: true, email: true }
    })

    return (
        <AgentDashboard
            agentName={session.user.name || session.user.email}
            tickets={tickets}
            agents={agents}
        />
    )
}

export default AgentPage
